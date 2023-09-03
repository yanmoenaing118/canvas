import { HEIGHT, WIDTH } from "./constants";
import setResolution from "./resolution";

export default class Render {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  constructor() {
    const canvas = document.createElement("canvas") as HTMLCanvasElement;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.canvas = canvas;
    document.body.appendChild(canvas);
    canvas.style.boxShadow = "0 0 3px rgba(0,0,0,0.3)";
    setResolution(canvas, WIDTH, HEIGHT);
  }
}
