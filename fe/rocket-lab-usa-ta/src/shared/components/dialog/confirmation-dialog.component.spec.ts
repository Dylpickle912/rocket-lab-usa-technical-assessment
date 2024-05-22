import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import {NgClass, NgIf} from "@angular/common";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef
} from "@angular/material/dialog";

describe('DialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationDialogComponent,
        NgIf,
        NgClass,
        MatDialogContent,
        MatDialogActions,
        MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: jasmine.createSpyObj<MatDialogRef<ConfirmationDialogComponent>>(MatDialogRef.name, ['close']) },
        { provide: MAT_DIALOG_DATA, useValue: {
            title: 'Dialog Data',
            message: 'Message',
            buttonText: 'Ok',
            buttonStatus: 'Positive'
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
