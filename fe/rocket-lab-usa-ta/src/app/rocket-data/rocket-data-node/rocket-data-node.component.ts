import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
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
export class RocketDataNodeComponent implements OnChanges {
  @Output() public emitPathSelected = new EventEmitter<string>();
  @Input() public dataNode?: DataNode;
  @Input() public parentLayerIndex = 0;
  @Input() public parentPath = '';
  @Input() public expandChildren = false;
  @Input() public currentSearch = '';

  public currentLayer = 1;
  public currentPath = '';

  constructor() { }

  public ngOnChanges(_changes: SimpleChanges) {
    this.currentLayer += this.parentLayerIndex;
    const prefix = (this.currentSearch && this.currentLayer === 1 ? this.currentSearch : this.parentPath).replace('Rocket/', '');
    if (this.dataNode) this.currentPath = `${prefix}${this.currentLayer !== 1 ? this.dataNode.key + '/' : ''}`;
  }

  public onNavigate(): void {
    this.emitPathSelected.emit(this.currentPath);
  }
}
