import { CELL_HEIGH, CELL_WIDTH } from "./constants";

export default class Grid {
  cols: number;
  rows: number;
  fill: string = "purple";

  constructor(w: number, h: number, fill?: string) {
    this.cols = w / CELL_WIDTH;
    this.rows = h / CELL_HEIGH;
    if (fill) {
      this.fill = fill;
    }
  }

  drawLine(ctx: CanvasRenderingContext2D,x: number, y: number, dir: 'row' | 'col') {
    ctx.save();
    ctx.strokeStyle = this.fill;
    ctx.lineWidth = 1;
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    if(dir === 'col') {
        ctx.lineTo(0, this.rows * CELL_HEIGH);
    } 
    if(dir === 'row') {
        ctx.lineTo(this.cols * CELL_WIDTH, 0);
    }
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }

  render(ctx: CanvasRenderingContext2D) {
    for (let x = 0; x < this.cols; x++) {
        this.drawLine(ctx, x * CELL_WIDTH, 0, 'col');
    }

    for (let y = 0; y < this.rows; y++) {
        this.drawLine(ctx,0, y*CELL_HEIGH, 'row');

    }
  }
}
