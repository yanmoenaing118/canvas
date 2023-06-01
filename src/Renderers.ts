import { ctx } from ".";
import { Sprite, TileSprite } from "./Entities";

export const renderTileSprite = <Type extends Sprite>(entity: Type) => {
  ctx.save();
  ctx.translate(entity.pos.x, entity.pos.y);
  ctx.scale(entity.scale.x, entity.scale.y);
  ctx.translate(entity.anchor.x, entity.anchor.y)
  if (entity instanceof TileSprite) {
    if(!entity.frame) return;
    ctx.drawImage(
      entity.texture.img,
      entity.frame.x * entity.tileW,
      entity.frame.y * entity.tileH,
      entity.tileW,
      entity.tileW,
      0,
      0,
      entity.tileW,
      entity.tileH
    );

  } else if (entity instanceof Sprite) {
    ctx.drawImage(entity.texture.img, 0, 0);
  } else {
  }
  ctx.restore();
};
