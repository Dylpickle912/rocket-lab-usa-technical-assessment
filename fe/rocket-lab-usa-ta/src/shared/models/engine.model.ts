export interface Engine {
  thrust: number;
  isp: number;
}

export const DefaultEngine: Engine = {
  thrust: 0,
  isp: 0
}
