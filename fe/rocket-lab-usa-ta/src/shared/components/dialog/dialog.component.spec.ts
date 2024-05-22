import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComponent } from './dialog.component';
import {NgClass, NgIf} from "@angular/common";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef
} from "@angular/material/dialog";

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogComponent,
        NgIf,
        NgClass,
        MatDialogContent,
        MatDialogActions,
        MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: jasmine.createSpyObj<MatDialogRef<DialogComponent>>(MatDialogRef.name, ['close']) },
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

    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
