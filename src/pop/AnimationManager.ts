import TileSprite from "./TileSprite";
import { AnimSignature, Frame } from "./models";

export class Anim {
  frame: Frame = { x: 0, y: 0 };
  frames: Frame[] = [];
  speed: number = 0.1;
  currTime: number = 0;
  currFrame: number = 0;

  constructor(frames: Frame[], speed: number) {
    this.frames = frames;
    this.speed = speed;
    this.reset();
  }

  update(dt: number) {
    this.currTime += dt;
    if (this.currTime > this.speed) {
      this.currFrame++;
      this.frame = this.frames[this.currFrame % this.frames.length];
      this.currTime -= this.speed;
    }
  }

  reset() {
    this.currFrame = 0;
    this.currTime = 0;
  }
}

export default class AnimationManager {
  anims: AnimSignature = {};
  current: string | null = null;
  frameSource: Frame;
  constructor(e: TileSprite) {
    this.frameSource = e.frame || e;
  }

  /**
   * 
   * @param name name of the animation
   * @param frames frame for the name's animation
   * @param speed speed of the animation
   * @returns animation itsefl
   */
  add(name: string, frames: Frame[], speed: number): Anim {
    this.anims[name] = new Anim(frames, speed);
    return this.anims[name];
  }


  /**
   * 
   * @param name name of the animation to play
   * @returns 
   */
  play(name: string){
    if(name == this.current) return;
    this.current = name;
    this.anims[name].reset();
    // console.log(this.anims[name])
  }


  /**
   * 
   * @param dt time
   * @returns 
   * update the tileSprite's frameSource based of the current Anim frames and selected frame
   */
  update(dt: number){
    if(!this.current) return;
    this.anims[this.current].update(dt);
    this.frameSource.x = this.anims[this.current].frame.x;
    this.frameSource.y = this.anims[this.current].frame.y;
  }
  
}
