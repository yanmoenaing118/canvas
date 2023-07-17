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

export function hit(e1: Entity, e2: Entity) {
  const b1 = bounds(e1);
  const b2 = bounds(e2);
  return (
    b1.x <= b2.x + b2.w &&
    b1.x + b1.w >= b2.x &&
    b1.y <= b2.y + b2.h &&
    b1.y + b1.h >= b2.y
  );
}
