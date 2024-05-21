import {Stage} from "./stage.model";

export interface Rocket {
  height: number;
  mass: number;
  stages: Stage[];
}

export const DefaultRocket: Rocket = {
  height: 0,
  mass: 0,
  stages: []
}
