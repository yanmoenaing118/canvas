import { Vec2 } from "./classes";

export default class Ball {
  pos: Vec2;

  constructor(public size: number, x: number, y: number, public color: string) {
    this.pos = new Vec2(x, y);
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

  update(dt: number, t: number) {}
}
