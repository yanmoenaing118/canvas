import Rect from "./Rect";


/**
 * 
 * @param rect Rect to be rendered
 * @param ctx Canvas Context getContext('2d')
 */
export const renderRect = (rect: Rect, ctx: CanvasRenderingContext2D) => {
  const { pos, w, h, style } = rect;
  ctx.save();
  if (style.fill) {
    ctx.fillStyle = style.fill;
  }
  if (style.stroke) {
    ctx.strokeStyle = style.stroke;
  }
  ctx.translate(pos.x, pos.y);
  if (style.fill) {
    ctx.fillRect(0, 0, w, h);
  }
  if (style.stroke) {
    ctx.strokeRect(0, 0, w, h);
  }
  ctx.restore();
};
