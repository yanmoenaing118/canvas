import { Anims, Frame, Position } from "./interfaces";

export class Texture {
  img: HTMLImageElement;
  constructor(url: string) {
    this.img = new Image();
    this.img.src = url;
  }
}

export class Sprite {
  pos: Position = { x: 0, y: 0 };
  scale: Position = { x: 1, y: 1 };
  anchor: Position = { x: 0, y: 0};
  rotation: number = 0;
  texture: Texture;

  constructor(texture: Texture) {
    this.texture = texture;
  }
}

export class TileSprite extends Sprite {
  tileW: number;
  tileH: number;

  isRunning: boolean = true;
  frameRate: number = 0.1; // in second
  currTime: number = 0;
  currFrame = 0;
  y = 1;
  anims: Anims = {};
  frames: Frame[] = [];
  frame: Frame = { x: 0, y: 0 };
  name: string = "";

  constructor(texture: Texture, tileW: number, tileH: number) {
    super(texture);
    this.tileW = tileW;
    this.tileH = tileH;
  }

  add(name: string, frames: Frame[]) {
    this.anims[name] = frames;
  }

  play(name: string) {
    this.isRunning = true;
    this.name = name;
    if(this.frames != this.anims[this.name]) {
      this.frames = this.anims[this.name];
    }
    this.currFrame = 0;
    this.frame = this.frames[this.currFrame];
  }

  stop() {
    this.isRunning = false;
  }

  update(dt: number) {
    this.animate(dt);
  }

  animate(dt: number) {
    this.currTime += dt;
    if (this.currTime > this.frameRate) {
      if (this.isRunning) {
        this.frame = this.frames[++this.currFrame % this.frames.length];
      } else {
        this.currFrame = this.currFrame;
        this.frame = this.frame;
      }
      this.currTime -= this.frameRate;
    }
    // console.log(this.frame);
  }
}

export class Spider extends TileSprite {
  constructor(texture: Texture, tileW: number, tileH: number, speed: number) {
    super(texture, tileW, tileH);
    this.frameRate = speed;
  }
}
