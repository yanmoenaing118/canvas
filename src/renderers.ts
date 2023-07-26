export function drawPath(ctx: CanvasRenderingContext2D, x: number, y: number, fill: string) {
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.closePath();
}
