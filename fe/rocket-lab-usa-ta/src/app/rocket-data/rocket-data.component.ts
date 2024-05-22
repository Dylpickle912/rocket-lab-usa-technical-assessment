import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, debounceTime, skip, Subject, Subscription} from "rxjs";
import {AsyncPipe, NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RocketService} from "../../shared/services/rocket.service";
import {DataNode} from "../../shared/models/node.models";
import {ShavePathsPipe} from "../../shared/pipes/shave-paths.pipe";
import {HighlightPathSuggestionPipe} from "../../shared/pipes/highlight-path-suggestion.pipe";

@Component({
  selector: 'app-rocket-data',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    NgForOf,
    ShavePathsPipe,
    HighlightPathSuggestionPipe
  ],
  templateUrl: './rocket-data.component.html',
  styleUrl: './rocket-data.component.scss',
  providers: [
    RocketService
  ]
})
export class RocketDataComponent implements OnInit, OnDestroy {
  public searchPath$ = new Subject<string>();
  public searchPathToDebounce$ = new BehaviorSubject('');
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
      this.searchPath$.pipe(
        debounceTime(200)
      ).subscribe((path) => {
        this.searchPathToDebounce$.next(path);
        this.setSearchTermFromPath();
        this.searchPathResults$.next(this.rocketService.searchPaths(path));
        this.getData(path);
      })
    );
  }

  private setSearchTermFromPath(): void {
    const term = this.searchPathToDebounce$.value.split('/').pop() ?? '';
    this.searchTermFromPath$.next(term);
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public onSearchPathChanged(path: string): void {
    this.searchPath$.next(path);
  }

  public getData(path?: string): void {
    this.data$.next(this.rocketService.fetchRocketDetails(path));
    console.log('Data:', this.data$.value);
  }
}
