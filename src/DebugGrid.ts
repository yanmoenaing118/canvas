export const renderGrid = (
  ctx: CanvasRenderingContext2D,
  rows: number,
  cols: number,
  cellW: number,
  cellH: number,
  color: string = "black"
) => {
  for (let i = 0; i < cols; i++) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.translate(i * cellW, 0);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, rows * cellH);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }

  for (let i = 0; i < rows; i++) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.translate(0, i * cellH);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(cols * cellW, 0);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }
};
