import {Component, Inject, Input, Optional} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef
} from "@angular/material/dialog";

interface DialogData {
  title?: string;
  message?: string;
  buttonText: string;
  buttonStatus: 'Positive' | 'Negative';
}

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    MatDialogContent,
    MatDialogActions,
    MatDialogModule
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  public title?: string;
  public message?: string;
  public buttonText: string = 'Ok';
  public buttonStatus: 'Positive' | 'Negative' = 'Positive';

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    if (this.data.title) this.title = this.data.title;
    if (this.data.message) this.message = this.data.message;
    this.buttonText = this.data.buttonText;
    this.buttonStatus = this.data.buttonStatus;
  }

  public onCancel(): void {
    this.dialogRef.close(false);
  }

  public onConfirm(): void {
    this.dialogRef.close(true);
  }
}
