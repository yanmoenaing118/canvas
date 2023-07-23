import Rect from "./Rect";
import TileSprite from "./TileSprite";

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

export const renderTileSprite = (
  tileSprite: TileSprite,
  ctx: CanvasRenderingContext2D
) => {
  const { w, h, frame, pos, texture, scale } = tileSprite;

  ctx.save();
  ctx.translate(pos.x, pos.y);
  ctx.scale(scale.x, scale.y)
  ctx.drawImage(texture, frame.x * w, frame.y * h, w, h, 0, 0, w, h);
  ctx.restore();
};
