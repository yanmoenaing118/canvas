import Sprite from "./Sprite";

export function hasCollide(rect1: Sprite, rect2: Sprite, margin: number = 0) {
  return (
    rect1.pos.x < rect2.pos.x + rect2.w - margin &&
    rect1.pos.x + rect1.w - margin > rect2.pos.x &&
    rect1.pos.y < rect2.pos.y + rect2.h &&
    rect1.h + rect1.pos.y > rect2.pos.y
  );
}

export function clamp(x: number, min: number, max: number) {
  return Math.max(min, Math.min(x, max));
}
