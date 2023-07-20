import Entity from "./Entity";
import TileMap from "./TileMap";
import TileSprite from "./TileSprite";
import Vec2 from "./Vec2";

/**
 *
 * @param milli
 * @returns seconds
 */
export function sec(milli: number) {
  return milli * 0.001;
}

export function clamp(x: number, min: number, max: number) {
  return Math.max(min, Math.min(x, max));
}

export function distance(e1: Entity, e2: Entity) {
  return Math.sqrt(
    (e1.pos.x - e2.pos.x) * (e1.pos.x - e2.pos.x) +
      (e1.pos.y - e2.pos.y) * (e1.pos.y - e2.pos.y)
  );
}

export function rand(min: number, max?: number) {
  if (!max) {
    max = min;
    return Math.floor(Math.random() * max);
  }
  return Math.floor((max - min) * Math.random() + min);
}

export function randInOne(value: number) {
  return rand(0, value) == 0;
}

export function bounds(e: Entity) {
  return {
    x: e.pos.x,
    y: e.pos.y,
    w: e.w,
    h: e.h,
  };
}

export function tilesAtCorners(
  e: Entity,
  map: TileMap,
  xo = 0,
  yo = 0
): TileSprite[] {
  const b = bounds(e);
  return [
    [b.x, b.y], // TL - top left
    [b.x + b.w, b.y], // TR - top right
    [b.x, b.y + b.h], // BL - bottom left
    [b.x + b.w, b.y + b.h], // BR - bottom righ
  ].map(([x, y]) => map.tileAtPixelPosition({ x: x + xo, y: y + yo }));
}

export function center(e: Entity) {
  return {
    x: e.pos.x + e.w / 2,
    y: e.pos.y + e.h / 2,
  };
}

export function angle(e1: Entity, e2: Entity) {
  const p1 = center(e1);
  const p2 = center(e2);
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  console.log(dx, dy);
  return Math.atan2(dy, dx);
}
