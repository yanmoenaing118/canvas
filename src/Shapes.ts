import { Position } from "./types";

export class Rect {
  pos: Position = { x: 0, y: 0 };
  fill: string;
  width: number = 40;
  height: number = 40;
  constructor(
    x: number,
    y: number,
    width: number = 40,
    height: number = 40,
    fill: string
  ) {
    this.pos.x = x;
    this.pos.y = y;
    this.width = width;
    this.height = height;
    this.fill = fill;
  }
}
