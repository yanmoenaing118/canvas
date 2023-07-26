export function drawPath(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(x, y, 4, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.closePath();
}
