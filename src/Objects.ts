/**
 *
 * @param ellapsedTime
 * @param context
 */

export function drawTimestamp(
  ellapsedTime: number,
  context: CanvasRenderingContext2D
) {
  const totalMin = `${Math.round(ellapsedTime * 0.001)} sec`; // milli to sec
  const textWidth = context.measureText(totalMin).width;
  context.save();
  context.translate(
    context.canvas.width - textWidth - 20,
    context.canvas.height - 10
  );
  context.fillStyle = "black";
  context.font = "18px Consolas";
  context.fillText(totalMin, 0, 0);
  context.restore();
}
