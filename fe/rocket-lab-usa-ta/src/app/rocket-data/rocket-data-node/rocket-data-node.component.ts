import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import {DataNode} from "../../../shared/models/node.models";
import {AsyncPipe, DecimalPipe, NgClass, NgForOf, NgIf, NgStyle, NgTemplateOutlet} from "@angular/common";
import {ExpansionPanelComponent} from "../../../shared/components/expansion-panel/expansion-panel.component";
import {MatDialog} from "@angular/material/dialog";
import {RocketService} from "../../../shared/services/rocket.service";
import {AddNodeDialogComponent} from "../../../shared/components/add-node-dialog/add-node-dialog.component";
import {TimeSinceCreationPipe} from "../../../shared/pipes/time-since-creation.pipe";
import {
  ConfirmationDialogComponent
} from "../../../shared/components/confirmation-dialog/confirmation-dialog.component";

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
    AsyncPipe,
    TimeSinceCreationPipe
  ],
  templateUrl: './rocket-data-node.component.html',
  styleUrl: './rocket-data-node.component.scss'
})
export class RocketDataNodeComponent implements OnChanges {
  @Output() public emitPathSelected = new EventEmitter<string>();
  @Output() public emitRefreshData = new EventEmitter<void>();
  @Input() public dataNode?: DataNode;
  @Input() public parentLayerIndex = 0;
  @Input() public parentPath = '';
  @Input() public expandChildren = false;
  @Input() public currentSearch = '';

  public currentLayer = 1;
  public currentPath = '';

  constructor(private readonly dialog: MatDialog,
              private readonly rocketService: RocketService) { }

  public ngOnChanges(_changes: SimpleChanges) {
    this.currentLayer += this.parentLayerIndex;
    const prefix = (this.currentSearch && this.currentLayer === 1 ? this.currentSearch : this.parentPath).replace('Rocket/', '');
    if (this.dataNode) this.currentPath = `${prefix}${this.currentLayer !== 1 ? this.dataNode.key + '/' : ''}`;
  }

  public onNavigate(): void {
    this.emitPathSelected.emit(this.currentPath);
  }

  public onOpenAddDialog(): void {
    let dialogRef = this.dialog.open(AddNodeDialogComponent);

    dialogRef.afterClosed().subscribe((result: DataNode) => {
      if (!result) return;
      this.onSaveData(result);
      this.emitRefreshData.emit();
    });
  }

  public onOpenDeleteDialog(): void {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Delete Node',
        message: 'Are you sure you want to delete node at path: ' + this.currentPath,
        buttonText: 'Delete',
        buttonStatus: 'Negative'
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (!result) return;
      this.onDeletePath();
      this.emitRefreshData.emit();
    });
  }

  private onSaveData(result: DataNode): void {
    result.value ? this.onAddProperty(result) : this.onAddNode(result.key);
  }

  private onAddNode(key: string): void {
    this.rocketService.addNode(key, this.currentPath);
  }

  private onAddProperty(property: DataNode): void {
    this.rocketService.addProperty(property, this.currentPath);
  }

  private onDeletePath(): void {
    this.rocketService.deleteNode(this.currentPath);
  }
}
