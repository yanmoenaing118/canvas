import Entity from "./Entity";
import { clamp } from "./utils";

/**
 * Camera is a container with children entity that need to be in the camera
 */
export default class Camera extends Entity {
  worldW: number;
  worldH: number;

  entity!: Entity;
  children: Entity[] = [];

  constructor(w: number, h: number, worldW: number, worldH: number) {
    super();
    this.w = w;
    this.h = h;
    this.worldW = worldW;
    this.worldH = worldH;
  }

  add<T extends Entity>(e: T): T {
    this.children.push(e);
    return e;
  }

  setEntity<T extends Entity>(e: T) {
    this.entity = e;
  }

  focus() {
    const maxX = this.worldW - this.w;
    const centeredX = this.entity.pos.x - (this.w/2);
    const x = -clamp(centeredX, 0, maxX);

    const maxY = this.worldH - this.h;
    const centeredY = this.entity.pos.y - (this.h / 2);
    const y = -clamp(centeredY, 0, maxY);

    this.pos.x = x;
    this.pos.y = y;
  }

  update(dt: number, t: number): void {
      if(this.entity) {
        this.focus();
      }
  }
}
