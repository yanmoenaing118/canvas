import Entity from "./Entity";

export default class Sprite extends Entity {
  img: HTMLImageElement;
  constructor(img: HTMLImageElement, w: number, h: number) {
    super();
    this.img = img;
    this.w = w;
    this.h = h;
  }
}
