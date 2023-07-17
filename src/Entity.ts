import { Vec2 } from "./interfaces";

class Entity {
  pos: Vec2;
  w: number;
  h: number;
  fill: string;

  // hit box is the actual collision point
  hitBox = {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
  };

  constructor(w: number, h: number, fill: string) {
    this.pos = { x: 0, y: 0 };
    this.w = w;
    this.h = h;
    this.fill = fill;
    this.hitBox = { ...this.pos, w, h };
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.fillStyle = this.fill;
    ctx.translate(this.pos.x, this.pos.y);
    ctx.fillRect(0, 0, this.w, this.h);
    ctx.restore();
  }
}

export default Entity;
