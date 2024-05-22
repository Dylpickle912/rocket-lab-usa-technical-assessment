import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, debounceTime, skip, Subject, Subscription} from "rxjs";
import {AsyncPipe, NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RocketService} from "../../shared/services/rocket.service";
import {DataNode} from "../../shared/models/node.models";
import {ShavePathsPipe} from "../../shared/pipes/shave-paths.pipe";
import {HighlightPathSuggestionPipe} from "../../shared/pipes/highlight-path-suggestion.pipe";
import {SuggestionsComponent} from "./suggestions/suggestions.component";

@Component({
  selector: 'app-rocket-data',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    NgForOf,
    ShavePathsPipe,
    HighlightPathSuggestionPipe,
    SuggestionsComponent
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
        this.searchPathResults$.next(this.rocketService.searchPaths(path));
        this.getData(path);
      })
    );
  }

  private setSearchTermFromPath(): void {
    const term = this.currentPath$.value.split('/').pop() ?? '';
    this.searchTermFromPath$.next(term);
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public onSearchPathChanged(path: string): void {
    this.searchInputToDebounce$.next(path);
  }

  public getData(path?: string): void {
    this.data$.next(this.rocketService.fetchRocketDetails(path));
    console.log('Data:', this.data$.value);
  }

  public onSuggestionSelected(path: string): void {
    /*
      Case 1: Rocket/Stage1/Engine1
      Data = true;
      - Check for / at the end
      - If not there, add it and append selected path

      Case 2: Rocket/Stage1/en
      Data = false;
      - Get index of last /
      - Remove all characters after index of /
      - Append the selected path
     */

    if (this.data$.value) {
      const newPath = `${this.searchInputToDebounce$.value}${this.currentPath$.value.endsWith('/') ? '' : '/'}${path}`;
      this.searchInputToDebounce$.next(newPath);
    } else {
      const indexOfSlash = this.searchInputToDebounce$.value.lastIndexOf('/');
      const removedPath = this.searchInputToDebounce$.value.substring(0, indexOfSlash);
      this.searchInputToDebounce$.next(`${removedPath}${(indexOfSlash !== -1 ? '/' : '')}${path}`);
    }
  }
}
