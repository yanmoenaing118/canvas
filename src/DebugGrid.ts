export default function drawDebugGrid(
  ctx: CanvasRenderingContext2D,
  rows: number,
  cols: number,
  cellSize: number = 32
) {
  let i = 0;
  const lineLenghtY = cols * cellSize;
  const lineLenghtX =  rows * cellSize;


  ctx.save();
  ctx.strokeStyle = 'red';
  ctx.strokeRect(0,0,cols*cellSize,rows*cellSize);
  ctx.restore();

  let x,
    y = 0;
  for (i = 0; i < rows; i++) {
    y = i * cellSize;
    x = 0;
    drawPath(ctx, x, y, lineLenghtY, 0);
  }

  i = 0;
  for (i = 0; i < cols; i++) {
    y = 0;
    x = i * cellSize;
    drawPath(ctx, x, y, 0, lineLenghtX);
  }
}

function drawPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  dx: number,
  dy: number
) {
  ctx.save();
  ctx.beginPath();
  ctx.translate(x, y);
  ctx.moveTo(0, 0);
  ctx.lineTo(dx, dy);
  ctx.stroke();
  ctx.restore();
}
