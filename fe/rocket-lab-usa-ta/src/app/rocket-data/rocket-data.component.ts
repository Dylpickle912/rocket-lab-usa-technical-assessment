import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, debounceTime, skip, Subject, Subscription} from "rxjs";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RocketService} from "../../shared/services/rocket.service";
import {DataNode} from "../../shared/models/node.models";
import {ShavePathsPipe} from "../../shared/pipes/shave-paths.pipe";
import {HighlightPathSuggestionPipe} from "../../shared/pipes/highlight-path-suggestion.pipe";
import {SuggestionsComponent} from "./suggestions/suggestions.component";
import {RocketDataNodeComponent} from "./rocket-data-node/rocket-data-node.component";

@Component({
  selector: 'app-rocket-data',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    NgForOf,
    ShavePathsPipe,
    HighlightPathSuggestionPipe,
    SuggestionsComponent,
    NgIf,
    RocketDataNodeComponent
  ],
  templateUrl: './rocket-data.component.html',
  styleUrl: './rocket-data.component.scss',
  providers: [
    RocketService
  ]
})
export class RocketDataComponent implements OnInit, OnDestroy {
  public searchInputToDebounce$ = new BehaviorSubject('');
  public currentPath$ = new BehaviorSubject('');
  public searchTermFromPath$ = new BehaviorSubject('');
  public data$ = new BehaviorSubject<DataNode | undefined>(undefined);
  public searchPathResults$ = new BehaviorSubject<string[]>([]);

  private subscription = new Subscription();
  constructor(private readonly rocketService: RocketService) { }

  public ngOnInit() {
    this.getData();
    this.setSearchSuggestionResults();
    this._subscribeToSearch();
  }

  private _subscribeToSearch(): void {
    this.subscription.add(
      this.searchInputToDebounce$.pipe(
        skip(1),
        debounceTime(200)
      ).subscribe((path) => {
        this.currentPath$.next(path);
        this.setSearchTermFromPath();
        this.setSearchSuggestionResults();
        this.getData(path);
      })
    );
  }

  private setSearchTermFromPath(): void {
    const term = this.currentPath$.value.split('/').pop() ?? '';
    this.searchTermFromPath$.next(term);
  }

  private setSearchSuggestionResults(): void {
    this.searchPathResults$.next(this.rocketService.searchPaths(this.currentPath$.value));
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public onSearchPathChanged(path: string): void {
    this.searchInputToDebounce$.next(path);
  }

  public getData(path?: string): void {
    this.data$.next(this.rocketService.fetchRocketDetails(path));
  }

  public onSuggestionSelected(path: string): void {
    const currentValue = this.searchInputToDebounce$.value;
    const hasTrailingSlash = currentValue.endsWith('/');
    const segments = currentValue.split('/').filter(segment => segment);

    let newPath: string;
    if (this.data$.value) {
      newPath = `${currentValue}${!hasTrailingSlash && segments.length > 0 ? '/' : ''}${path}/`;
    } else {
      const indexOfSlash = currentValue.lastIndexOf('/');
      const basePath = indexOfSlash !== -1 ? currentValue.substring(0, indexOfSlash) : '';
      newPath = `${basePath}/${path}/`;
    }
    this.searchInputToDebounce$.next(newPath);
  }
}
