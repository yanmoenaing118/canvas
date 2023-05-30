import { AnimSignature, Frame } from "./models";

export class Anim {
  frames: Frame[];
  currFrame: Frame = { x: 0, y: 0 };
  frameRate: number = 0.1;
  currTime: number = 0;
  currFrameIndex = 0;

  constructor(frames: Frame[]) {
    this.frames = frames;
  }

  update(dt: number) {
    this.currTime += dt;
    if (this.currTime > this.frameRate) {
      this.currFrame = this.frames[++this.currFrameIndex % this.frames.length];
      this.currTime -= this.frameRate;
    }
  }
}

export default class AnimationManager {
  anims: AnimSignature;
  constructor() {
    this.anims = {};
  }

  /**
   * @param name - Name of the Animation - ex: walk, run, stop
   * @param frames array of frames for each animation
   */
  add(name: string, frames: Frame[]) {
    this.anims[name] = new Anim(frames);
  }

  play(name: string){
    this.anims[name].currFrameIndex = 0;
  }

  update(dt: number) {

  }

  stop(name: string) {
    
  }

}
