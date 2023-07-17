import { CELL_HEIGH, CELL_WIDTH } from "./constants";

export default class Grid {
  cols: number;
  rows: number;
  constructor(w: number, h: number) {
    this.cols = w / CELL_WIDTH;
    this.rows = h / CELL_HEIGH;
  }

  drawLine(ctx: CanvasRenderingContext2D) {
    ctx.save();

    ctx.restore();
  }

  render() {
    for (let x = 0; x < this.cols; x++) {}

    for (let y = 0; y < this.rows; y++) {}
  }
}
