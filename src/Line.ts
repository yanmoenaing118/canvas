import Vec from "./Vec";
import { canvas } from "./canvas";

export default class Line {
  startPoint: Vec;
  endPoint: Vec;
  constructor() {
    this.startPoint = new Vec(0, 0);
    this.endPoint = new Vec(0, 0);
    this.startPoint.set(32 * 10, 32 * 10);

    let mouseVec = new Vec(0, 0);

    canvas.addEventListener("mousemove", (e) => {
      mouseVec.set(e.pageX, e.pageY);
      mouseVec.sub(this.startPoint);
      this.endPoint.set(mouseVec.x, mouseVec.y);
    });
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
