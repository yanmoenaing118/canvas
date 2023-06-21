import Sprite from "./Sprite";
import { Frame } from "./types";

export default class TileSprite extends Sprite {
  tileW: number;
  tileH: number;
  frame: Frame;

  frameTime: number = 0.1;
  currentFrameTime: number = 0; 

  constructor(img: HTMLImageElement, w: number, h: number, frame?: Frame) {
    super(img, w, h);
    this.tileW = w;
    this.tileH = h;
    this.frame = frame || { x: 0, y: 0};
  } 

  update(dt: number, t: number): void {
    let { frameTime, frame } = this;
    if((this.currentFrameTime += dt ) >= frameTime) {
      frame.x = Math.round(t/frameTime) % 10;
      this.currentFrameTime -= frameTime;
    }
  }
}

