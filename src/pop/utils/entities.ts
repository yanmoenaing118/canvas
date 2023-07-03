import { Position } from "../models";
import math from "./math";
import { Entity } from "../models";
import Sprite from "../Sprite";
import Rect from "../Rect";
import Cheese from "../../entities/Cheese";
function center<T extends Entity>(entity: T): Position {
  return {
    x: entity.pos.x + entity.w / 2,
    y: entity.pos.y + entity.h / 2,
  };
}

function distance<T extends Entity>(a: T, b: T): number {
  return math.distance(center(a), center(b));
}

function debug(e: any) {
  try {
    const { hitBox } = e;

    const boundingRect = new Rect(e.w, e.h, {
      fill: "rgba(225,225,225,0.2)",
    });

    const hitRect = new Rect(hitBox.w, hitBox.h, {
      fill: "rgba(9,9,9,0.3)",
    });
    hitRect.pos = {
      x: hitBox.x,
      y: hitBox.y,
    };

    if (e instanceof Cheese) {
      console.log(boundingRect);
    }

    e.children.push(boundingRect);
    e.children.push(hitRect);
  } catch (error) {
    console.log(error);
  }
}

function bounds(entity: any) {
  const { w, h, pos, hitBox } = entity;
  const hit = hitBox || { x: 0, y: 0, w, h };
  return {
    x: hit.x + pos.x,
    y: hit.y + pos.y,
    w: hit.w - 1,
    h: hit.h - 1,
  };
}

function hit(e1: any, e2: any) {
  const a = bounds(e1);
  const b = bounds(e2);
  return (
    a.x + a.w >= b.x && a.x <= b.x + b.w && a.y + a.h >= b.y && a.y <= b.y + b.h
  );
}

function hits(e: any, container: any, hitCallback: Function) {
  const a = bounds(e);
  container.map((e2: any) => {
    const b = bounds(e2);
    if(
      a.x <= b.x + b.w &&
      a.x + a.w >= b.x &&
      a.y <= b.y + b.h &&
      a.y + a.h >= b.y 
     ){
      hitCallback(e2);
    }
  })
}

function relocate(w: number, h: number) {
  return {
    x: math.rand(w),
    y: math.rand(h)
  }
}

export default {
  center,
  distance,
  debug,
  bounds,
  hit,
  hits,
  relocate
};
