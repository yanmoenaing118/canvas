import AnimationManager from "./AnimationManager";
import Sprite from "./Sprite";
import { Frame } from "./types";

const walkLeft = new Array(10).fill(0).map((_, i) => ({
  x: i,
  y: 3,
}));

console.log(walkLeft)

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
    this.frame = frame || { x: 0, y: 0 };
    this.anim = new AnimationManager(this);
    this.anim.add('walkLeft', walkLeft, 0.1);
    this.anim.play('walkLeft');
  }

  update(dt: number, t: number): void {
    if (this.anim) {
      this.anim.update(dt, t);
    }
    console.log(this.frame)
  }
}
