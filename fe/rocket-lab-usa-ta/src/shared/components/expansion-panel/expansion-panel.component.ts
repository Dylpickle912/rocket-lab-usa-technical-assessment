import {Component, Input, Output} from '@angular/core';
import {MatExpansionPanel, MatExpansionPanelContent, MatExpansionPanelHeader} from "@angular/material/expansion";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-expansion-panel',
  standalone: true,
  imports: [
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelContent,
    NgClass
  ],
  templateUrl: './expansion-panel.component.html',
  styleUrl: './expansion-panel.component.scss'
})
export class ExpansionPanelComponent {
  @Input() public expanded = false;
  @Input() public removeBottomContentPadding = false;
}
