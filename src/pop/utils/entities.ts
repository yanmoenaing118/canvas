import { Position } from "../models";
import math from "./math";

type Entity = {
  pos: Position;
  w: number;
  h: number;
};

function center<T extends Entity>(entity: T): Position {
  return {
    x: entity.pos.x + entity.w / 2,
    y: entity.pos.y + entity.h / 2,
  };
}

function distance<T extends Entity>(a: T, b: T): number {
  return math.distance(center(a), center(b)
  );
}

export default {
  center,
  distance
};
