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
