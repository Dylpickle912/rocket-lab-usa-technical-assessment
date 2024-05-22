import {Component, Input, OnInit} from '@angular/core';
import {DataNode} from "../../../shared/models/node.models";
import {NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";

@Component({
  selector: 'app-rocket-data-node',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NgStyle,
    NgClass
  ],
  templateUrl: './rocket-data-node.component.html',
  styleUrl: './rocket-data-node.component.scss'
})
export class RocketDataNodeComponent implements OnInit {
  @Input() public dataNode?: DataNode;
  @Input() public parentLayerIndex = 0;

  public currentLayer = 1;

  public ngOnInit() {
    this.currentLayer += this.parentLayerIndex;
  }
}
