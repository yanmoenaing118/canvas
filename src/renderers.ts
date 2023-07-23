import Rect from "./Rect";

export const renderRect = (rect: Rect, ctx: CanvasRenderingContext2D) => {
  const { pos, style, w, h } = rect;
  ctx.save();
  if (style.fill) {
    ctx.fillStyle = style.fill;
  }
  if (style.stroke) {
    ctx.strokeStyle = style.stroke;
  }
  ctx.translate(pos.x, pos.y);
  ctx.fillRect(0, 0, w, h);
  ctx.restore();
};
