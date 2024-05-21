import {Engine} from "./engine.model";

export interface Stage {
  engines: Engine[];
}

export const DefaultStage: Stage = {
  engines: []
}
