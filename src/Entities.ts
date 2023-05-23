import { Position } from "./interfaces";
export class Player {
  pos: Position = { x: 0, y: 0 };
  scale: Position = { x: 1, y: 1};
  anchor: Position = { x: 0, y: 0};
  rotation: number = 0;
  w: number = 40;
  h: number = 40;
  constructor() {}
}
