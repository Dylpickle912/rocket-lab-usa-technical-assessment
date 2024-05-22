import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DataNode} from "../../../shared/models/node.models";
import {AsyncPipe, DecimalPipe, NgClass, NgForOf, NgIf, NgStyle, NgTemplateOutlet} from "@angular/common";
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
    NgTemplateOutlet,
    DecimalPipe,
    AsyncPipe
  ],
  templateUrl: './rocket-data-node.component.html',
  styleUrl: './rocket-data-node.component.scss'
})
export class RocketDataNodeComponent implements OnInit {
  @Output() public emitPathSelected = new EventEmitter<string>();
  @Input() public dataNode?: DataNode;
  @Input() public parentLayerIndex = 0;
  @Input() public parentPath = '';
  @Input() public expandChildren = false;

  public currentLayer = 1;
  public currentPath = '';

  constructor() { }

  public ngOnInit() {
    this.currentLayer += this.parentLayerIndex;
    if (this.dataNode && this.currentLayer !== 1) this.currentPath = `${this.parentPath}${this.dataNode.key}/`;
  }

  public onNavigate(): void {
    this.emitPathSelected.emit(this.currentPath);
  }
}
