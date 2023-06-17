import { Position } from "./types";

export default class Entity {
  pos: Position;
  w: number;
  h: number;
  shape?: 'rect' | 'circle';
  style: { fillStyle?: string, strokeStyle?: string } = {
    fillStyle: '',
    strokeStyle: ''
  };

  constructor(x: number, y: number, w: number, h: number) {
    this.pos = {
      x,
      y,
    };
    this.w = w;
    this.h = h;
  }
}
