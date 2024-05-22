import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RocketDataNodeComponent } from './rocket-data-node.component';

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
});
