import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RocketDataNodeComponent } from './rocket-data-node.component';
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('RocketDataNodeComponent', () => {
  let component: RocketDataNodeComponent;
  let fixture: ComponentFixture<RocketDataNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RocketDataNodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RocketDataNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Check Data Value', () => {
    const green = 'rgb(21, 155, 4)'; // RGB equivalent of #159b04 ($green in Variables.scss)

    describe('value is greater than 10', () => {
      beforeEach(() => {
        component.dataNode = {
          key: 'Label',
          value: 15
        }

        fixture.detectChanges();
      });

      it('should add .valueOverTen to .key which changes the color to green', () => {
        const keyDE: DebugElement = fixture.debugElement.query(By.css('.key'));
        const color = getComputedStyle(keyDE.nativeElement).color;
        expect(keyDE.nativeElement.classList).toContain('valueOverTen');
        expect(color).toBe(green);
      });
    });


    describe('value is less than 10', () => {
      beforeEach(() => {
        component.dataNode = {
          key: 'Label',
          value: 7.648
        }

        fixture.detectChanges();
      });

      it('should not add .valueOverTen to .key', () => {
        const keyDE: DebugElement = fixture.debugElement.query(By.css('.key'));
        const color = getComputedStyle(keyDE.nativeElement).color;
        expect(keyDE.nativeElement.classList).not.toContain('valueOverTen');
        expect(color).not.toBe(green);
      });
    });
  });
});
