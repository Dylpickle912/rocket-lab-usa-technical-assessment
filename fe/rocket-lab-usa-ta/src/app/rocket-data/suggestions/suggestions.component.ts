import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {BoldPathSuggestionPipe} from "../../../shared/pipes/bold-path-suggestion.pipe";
import {ShavePathsPipe} from "../../../shared/pipes/shave-paths.pipe";

@Component({
  selector: 'app-suggestions',
  standalone: true,
  imports: [
    AsyncPipe,
    BoldPathSuggestionPipe,
    NgForOf,
    ShavePathsPipe,
    NgIf
  ],
  templateUrl: './suggestions.component.html',
  styleUrl: './suggestions.component.scss'
})
export class SuggestionsComponent {
  @Output() public emitSuggestionSelected = new EventEmitter<string>();
  @Input() public suggestionResults: string[] = [];
  @Input() public pathIsValid = false;
  @Input() public currentPath = '';
  @Input() public searchTerm = '';

  public onSuggestionSelected(path: string): void {
    this.emitSuggestionSelected.emit(path);
  }
}
