import Rect from "./Rect";
import Sprite from "./Sprite";
import TileMap from "./TileMap";
import TileSprite from "./TileSprite";

/**
 *
 * @param sprite Sprite instance
 * @param ctx Canvas Context getContext('2d')
 */
export const renderImg = (sprite: Sprite, ctx: CanvasRenderingContext2D) => {
  const { scale, anchor, pos, w, h } = sprite;
  ctx.save();
  ctx.translate(pos.x, pos.y);
  ctx.translate(anchor.x, anchor.y);
  ctx.scale(scale.x, scale.y);
  ctx.drawImage(sprite.img, 0, 0, w, h);
  ctx.restore();
};

export const renderTileSprite = (
  tileSprite: TileSprite,
  ctx: CanvasRenderingContext2D
) => {
  const { scale, anchor, pos, tileW, tileH, frame } = tileSprite;
  ctx.save();
  ctx.translate(pos.x, pos.y);
  ctx.translate(anchor.x, anchor.y);
  ctx.scale(scale.x, scale.y);
  ctx.drawImage(
    tileSprite.img,
    frame.x * tileW,
    frame.y * tileH,
    tileW,
    tileH,
    0,
    0,
    tileW,
    tileH
  );
  ctx.restore();
};

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

export const renderTileMap = (map: TileMap, ctx: CanvasRenderingContext2D) => {
  ctx.save();
  ctx.translate(map.pos.x, map.pos.y);
  for (let i = 0; i < map.chldren.length; i++) {
    renderTileSprite(map.chldren[i], ctx);
  }
  ctx.restore();
};
