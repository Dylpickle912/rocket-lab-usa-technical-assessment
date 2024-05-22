import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RocketDataComponent } from './rocket-data.component';

describe('RocketDataComponent', () => {
  let component: RocketDataComponent;
  let fixture: ComponentFixture<RocketDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RocketDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RocketDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
