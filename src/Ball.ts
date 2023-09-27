import { h, w } from "./canvas";
import { Vec2 } from "./classes";
import { clamp } from "./utils";

export default class Ball {
  pos: Vec2;
  vel = 0;
  jumping = false;

  constructor(public size: number, x: number, y: number, public color: string) {
    this.pos = new Vec2(x, y);
  }



  update(dt: number, t: number) {

    if(this.pos.y >= h - this.size ) {
        this.jumping = false;
        this.pos.y = h - this.size;
    }

    this.pos.x = clamp(this.pos.x, this.size, w - this.size);
    // this.pos.y = clamp(this.pos.y, this.size, h - this.size);
  }



  render(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.pos.x, this.pos.y);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(0, 0, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }

}
