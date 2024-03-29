import TileSprite from "./TileSprite";
import { Frame } from "./types";

type Anims = {
    [key: string]: Anim
}

class Anim {
    frameRate: number;
    currentTime: number;
    frames: Frame[];
    frame: Frame;
    currIdx: number = 0;

    constructor(frames: Frame[], speed: number) {
        this.frames = frames;
        this.frameRate = speed;
        this.currentTime = 0;
        this.frame = this.frames[0];

    }

    update(this: Anim,dt: number, t: number) {
        if((this.currentTime += dt) >= this.frameRate) {
            this.currentTime -= this.frameRate;
            this.frame = this.frames[ this.currIdx++ % this.frames.length]; 
        }
    }


    reset() {
        this.currentTime = 0;
        this.currIdx = 0;
        this.frame =this.frames[this.currIdx];
    }
}

export default class AnimationManager {
    anims: Anims = {}
    sourceTile: TileSprite;
    currentAnim: string ="";
    constructor(sourceTile: TileSprite) {
        this.sourceTile = sourceTile;
    }

    add(name: string, frames: Frame[], speed: number) {
        this.anims[name] = new Anim(frames, speed);
    }

    play(name: string) {
        if(name === this.currentAnim) {
            return;
        }
        this.currentAnim = name;
    }

    pause() {
        if(this.anims[this.currentAnim]) {
            this.anims[this.currentAnim].reset();
        }
        this.currentAnim = '';
    }

    update(dt: number, t: number) {
        if(!this.currentAnim) return;
        const current = this.anims[this.currentAnim];
        this.sourceTile.frame.x = current.frame.x;
        this.sourceTile.frame.y = current.frame.y;
        current.update(dt, t);
    }
}