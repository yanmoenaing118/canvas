import Texture from "./Texture";
import TileSprite from "./TileSprite";
import { FRAMES_SOLDIERS } from "./sprite-frames";

export default class Soldier extends TileSprite {
    speed: number = 400;
    gunRate = .05;
    currentTime = 0;
    frameIndex = 0;
    constructor() {
        super(new Texture('./assets/shooter.png'))
        this.frame.y = 1;
        this.frame.x = 1;

        console.log(this.texture.img)
    }

    update(dt: number, t: number) {
        this.frame.x = 1;
    }

    render(context: CanvasRenderingContext2D) {
        context.save();
        context.translate(this.pos.x, this.pos.y);
        context.drawImage(
          this.texture.img,
          this.tileW * this.frame.x,
          this.tileH * 0,
          this.tileW,
          this.tileH,
          0,
          0,
          this.tileW,
          this.tileH
        );
        // context.drawImage(this.texture.img, 0, 0); 
        context.restore();
    }
}