import {Component, Input, OnInit} from '@angular/core';
import {DataNode} from "../../../shared/models/node.models";
import {NgClass, NgForOf, NgIf, NgStyle, NgTemplateOutlet} from "@angular/common";
import {ExpansionPanelComponent} from "../../../shared/components/expansion-panel/expansion-panel.component";

@Component({
  selector: 'app-rocket-data-node',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NgStyle,
    NgClass,
    ExpansionPanelComponent,
    NgTemplateOutlet
  ],
  templateUrl: './rocket-data-node.component.html',
  styleUrl: './rocket-data-node.component.scss'
})
export class RocketDataNodeComponent implements OnInit {
  @Input() public dataNode?: DataNode;
  @Input() public parentLayerIndex = 0;
  @Input() public parentPath = '';

  public currentLayer = 1;
  public currentPath = '';

  public ngOnInit() {
    this.currentLayer += this.parentLayerIndex;
    if (this.dataNode) this.currentPath = `${this.parentPath}/${this.dataNode.key}`;
  }
}
