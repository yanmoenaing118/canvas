import { CELLSIZE, HEIGHT, WIDTH } from "./constants";

export default class RotatedObject {
  pos = { x: 0, y: 0 };
  rotation = 0;
  scale = { x: 1, y: 1 };
  w = CELLSIZE;
  h = CELLSIZE;

  anchor = { x: 0, y: 0 };
  pivot = { x: 0, y: 0 };

  constructor() {
    this.pos.x = WIDTH / 2;
    this.pos.y = HEIGHT / 2;

    this.pivot.x = this.w / 2;
    this.pivot.y = this.h / 2;
  }

  update(dt: number, t: number) {
    this.rotation += dt * 10;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.fillStyle = "pink";
    ctx.translate(this.pos.x, this.pos.y);
    if (this.rotation) {
      ctx.translate(this.pivot.x, this.pivot.y);
      ctx.rotate(this.rotation);
      ctx.translate(-this.pivot.x, -this.pivot.y);
    }
    ctx.scale(this.scale.x, this.scale.y);
    ctx.fillRect(0, 0, this.w, this.h);
    ctx.restore();
  }
}
