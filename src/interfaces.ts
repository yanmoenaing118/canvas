export class Vec2 {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export interface Bounds {
  x: number;
  y: number;
  w: number;
  h: number
}