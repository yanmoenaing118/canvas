import Entity from "./Entity";

export function bounds(e: Entity) {
  const hitBox = e.hitBox || { x: 0, y: 0, w: e.w, h: e.h };

  return {
    x: e.pos.x + hitBox.x,
    y: e.pos.y + hitBox.y,
    w: hitBox.w,
    h: hitBox.h,
  };
}


