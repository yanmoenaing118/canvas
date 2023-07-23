import Entity from "./Entity";

export default class Camera extends Entity {
  constructor(w: number, h: number) {
    super();
    this.w = w;
    this.h = h;
  }
}
