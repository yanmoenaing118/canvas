import AnimationManager from "./AnimationManager";
import Sprite from "./Sprite";
import { Frame } from "./types";


export default class TileSprite extends Sprite {
  tileW: number;
  tileH: number;
  frame: Frame;

  frameTime: number = 0.1;
  currentFrameTime: number = 0;
  anim: AnimationManager;

  constructor(img: HTMLImageElement, w: number, h: number, frame?: Frame) {
    super(img, w, h);
    this.tileW = w;
    this.tileH = h;
    this.frame = frame || { x: 0, y: 0 , id: 0};
    this.anim = new AnimationManager(this);
  }

  update(dt: number, t: number): void {
    if (this.anim) {
      this.anim.update(dt, t);
    }
  }
}
