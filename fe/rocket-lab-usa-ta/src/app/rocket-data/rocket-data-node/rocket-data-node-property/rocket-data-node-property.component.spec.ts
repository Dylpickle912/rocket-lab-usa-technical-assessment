import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RocketDataNodePropertyComponent } from './rocket-data-node-property.component';

describe('RocketDataNodePropertyComponent', () => {
  let component: RocketDataNodePropertyComponent;
  let fixture: ComponentFixture<RocketDataNodePropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RocketDataNodePropertyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RocketDataNodePropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
