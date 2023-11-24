import { getRandomNumber } from "./utils";

export default class Walker {
  constructor(public x: number, public y: number) {}

  render(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.arc(this.x, this.y, 1, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }

  update(dt: number) {
    const choice = getRandomNumber(4);
    if (choice == 0) {
      this.x++;
    } else if (choice == 1) {
      this.x--;
    } else if (choice == 2) {
      this.y++;
    } else {
      this.y--;
    }
  }
}
