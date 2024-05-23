import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {DataNode} from "../../models/node.models";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-add-node-dialog',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    FormsModule
  ],
  templateUrl: './add-node-dialog.component.html',
  styleUrl: '../confirmation-dialog/confirmation-dialog.component.scss'
})
export class AddNodeDialogComponent {
  public key = '';
  public value?: number;

  constructor(private dialogRef: MatDialogRef<AddNodeDialogComponent>) { }

  public onCancel(): void {
    this.dialogRef.close();
  }

  public onConfirm(): void {
    this.dialogRef.close({
      key: this.key,
      value: this.value
    } as DataNode)
  }
}
