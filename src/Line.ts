import Vec from "./Vec";

export default class Line {
  startPoint: Vec;
  endPoint: Vec;
  constructor() {
    this.startPoint = new Vec(0, 0);
    this.endPoint = new Vec(0, 0);
  }

  render(ctx: CanvasRenderingContext2D) {
    const { startPoint, endPoint } = this;
    ctx.save();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.translate(startPoint.x, startPoint.y);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(endPoint.x, endPoint.y);
    ctx.stroke();
    ctx.restore();
  }
}
