import { getRandomNumber } from "./utils";

export default class Walker {
  constructor(public x: number, public y: number) {}

  render(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }

  update(dt: number) {
    const stepX = getRandomNumber(3) - 1;
    const stepY = getRandomNumber(3) - 1;

    this.x += stepX * 2;
    this.y += stepY * 2;
    
  }
}
