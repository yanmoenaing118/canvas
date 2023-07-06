import Entity from "./Entity";

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

export function rand(min: number, max?:number) {
  if(!max) {
    max = min;
    return Math.floor(Math.random() * max);
  };
  return Math.floor((max  - min) * Math.random() + min);
}

export function randInOne(value: number) {
  return rand(0, value) == 0;
}