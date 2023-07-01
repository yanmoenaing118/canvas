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

    if(e instanceof Cheese) {
      console.log(boundingRect)
    }

    e.children.push(boundingRect);
    e.children.push(hitRect);
  } catch (error) {
    console.log(error);
  }
}

export default {
  center,
  distance,
  debug,
};