
import { RocketDataComponent } from './rocket-data.component';
import {RocketService} from "../../shared/services/rocket.service";
import {MatDialog} from "@angular/material/dialog";

describe('RocketDataComponent', () => {
  let component: RocketDataComponent;
  let rocketServiceSpy: jasmine.SpyObj<RocketService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    rocketServiceSpy = jasmine.createSpyObj(RocketService.name, ['searchPaths', 'fetchRocketDetails']);
    dialogSpy = jasmine.createSpyObj(MatDialog.name, ['open']);

    component = new RocketDataComponent(rocketServiceSpy, dialogSpy);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
