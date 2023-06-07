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
  anchor: Position = { x: 0, y: 0 };
  rotation: number = 0;
  texture: Texture;

  constructor(texture: Texture) {
    this.texture = texture;
  }
}

export class TileSprite extends Sprite {
  tileW: number;
  tileH: number;
  frame: Frame = {
    x: 0,
    y: 0,
  };
  anims: AnimationManager;
  constructor(texture: Texture, tileW: number, tileH: number) {
    super(texture);
    this.tileW = tileW;
    this.tileH = tileH;
    this.anims = new AnimationManager(this);
  }

  update(dt: number) {
    this.anims.update(dt);
  }
}

export class Anim {
  frames: Frame[];
  speed: number;
  frame: Frame = { x: 0, y: 0 };
  currTime: number = 0;
  currFrameIndex: number = 0;

  constructor(frames: Frame[], speed: number) {
    this.frames = frames;
    this.speed = speed;
    this.reset();
  }

  update(dt: number) {
    this.currTime += dt;
    if (this.currTime > this.speed) {
      this.currFrameIndex++;
      this.frame = this.frames[this.currFrameIndex % this.frames.length];
      this.currTime -= this.speed;
    }
  }

  reset() {
    this.currFrameIndex = 0;
    this.currTime = 0;
    this.frame = this.frames[this.currFrameIndex];
  }
}

export class AnimationManager {
  anims: Anims;
  currentFrames: Frame[];
  current: Anim | null;
  frameSource: Frame;

  constructor(frameSource: TileSprite) {
    this.anims = {};
    this.currentFrames = [];
    this.current = null;
    this.frameSource = frameSource.frame;
  }

  add(name: string, frames: Frame[], speed: number) {
    this.anims[name] = new Anim(frames, speed);
    return this.anims[name];
  }

  update(dt: number) {
    if (!this.current) return;
    this.current.update(dt);
    const anim = this.current;
    this.frameSource.x = anim.frame.x;
    this.frameSource.y = anim.frame.y;
  }

  play(name: string) {
    if (this.current == this.anims[name]) {
      return;
    }
    if (this.anims[name]) {
      this.current = this.anims[name];
      this.current.reset();
    }
  }

  stop() {
    this.current = null;
  }
}
