import {RocketDataComponent} from './rocket-data.component';
import {RocketService} from "../../shared/services/rocket.service";

describe('RocketDataComponent', () => {
  let component: RocketDataComponent;
  let rocketServiceSpy: jasmine.SpyObj<RocketService>;

  beforeEach(() => {
    rocketServiceSpy = jasmine.createSpyObj(RocketService.name, ['searchPaths', 'fetchRocketDetails']);

    component = new RocketDataComponent(rocketServiceSpy);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
