import Sprite from "./Sprite";
import Texture from "./Texture";
import TileSprite from "./TileSprite";
import math from "./math";
import { FRAME_SPIDERS } from "./sprite-frames";
export default class Spider extends TileSprite {
  padding: number = 4;
  speed: number;
  bite: boolean = false;
  life = 10;
  constructor() {
    super(new Texture("./assets/spider.png"));
    this.w = 64 - this.padding;
    this.h = 64 - this.padding;
    this.speed = math.rand(300, 600);
  }

  update(dt: number, t: number) {
    if (this.speed != 0) {
      this.speed += t * 0.5;
    }

    if (this.speed == 0) {
      if (!this.bite) {
        this.pos.x -= math.randf(80);
        // this.pos.y += 180;
        this.bite = true;
      } else {
        this.pos.x = this.pos.x;
      }
    } else {
      this.pos.x -= this.speed * dt;
    }
    const frameRate = this.speed == 0 ? 0.1 : (10 / this.speed) * 2.5;
    this.frame.x = Math.floor(t / frameRate) % FRAME_SPIDERS;
  }

  render(context: CanvasRenderingContext2D) {
    context.restore();
    context.save();
    context.fillStyle = "red";
    context.translate(this.pos.x, this.pos.y);
    context.scale(this.scale.x, this.scale.y);
    context.drawImage(
      this.texture.img,
      this.tileH * this.frame.x,
      this.tileH * this.frame.y,
      this.tileW,
      this.tileH,
      0,
      0,
      this.tileW,
      this.tileH
    );
    context.restore();
  }
}
