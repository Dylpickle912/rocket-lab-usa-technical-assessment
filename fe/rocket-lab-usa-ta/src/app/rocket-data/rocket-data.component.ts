import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, debounceTime, skip, Subscription} from "rxjs";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RocketService} from "../../shared/services/rocket.service";
import {DataNode} from "../../shared/models/node.models";
import {ShavePathsPipe} from "../../shared/pipes/shave-paths.pipe";
import {BoldPathSuggestionPipe} from "../../shared/pipes/bold-path-suggestion.pipe";
import {SuggestionsComponent} from "./suggestions/suggestions.component";
import {RocketDataNodeComponent} from "./rocket-data-node/rocket-data-node.component";
import {MatAccordion} from "@angular/material/expansion";
import { MatDialog } from '@angular/material/dialog';
import {ConfirmationDialogComponent} from "../../shared/components/dialog/confirmation-dialog.component";

@Component({
  selector: 'app-rocket-data',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    NgForOf,
    ShavePathsPipe,
    BoldPathSuggestionPipe,
    SuggestionsComponent,
    NgIf,
    RocketDataNodeComponent,
    MatAccordion,
    ConfirmationDialogComponent
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
  constructor(private readonly rocketService: RocketService,
              private readonly dialog: MatDialog) { }

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
    this.searchTermFromPath$.next(this.currentPath$.value.split('/').pop() ?? '');
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
    console.log('Data:', this.data$.value);
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
      newPath = `${basePath ? basePath + '/' : ''}${path}/`;
    }
    this.onSearchPathChanged(newPath);
  }

  public onOpenDialog(): void {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Title',
        message: 'Message',
        buttonText: 'Confirm',
        buttonStatus: 'Positive'
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Confirmed?', result);
    });
  }
}
