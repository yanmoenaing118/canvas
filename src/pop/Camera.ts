import Container from "./Container";
import Sprite from "./Sprite";
import { CameraViewport, Position } from "./models";
import math from './utils/math';

/**
 * This is the Camera which will follow the entity type 'T'
 * The entity must be an object with pos property in it - a Sprite mostly.
 */

export default class Camera<T extends Sprite> extends Container {
  subject!: Position;
  w: number;
  h: number;
  worldSize: CameraViewport;
  offset!: Position;
  /**
   *
   * @param subject Position to be followed by the Camera
   * @param viewport The size of the Camera screen: mostly the Canvas Area
   * @param worldSize The actual size of the world outside of the Camera's viewport
   */
  constructor(subject: T, viewport: CameraViewport, worldSize = viewport) {
    super();
    this.w = viewport.w;
    this.h = viewport.h;
    this.worldSize = worldSize;
    this.setSubject(subject);
  }

  /**
   *
   * @param e
   * If e is an entity we set the subject to it's position,
   * otherwise we assumes that e is already a position.
   * if none of these are true, we use Container's position
   */
  setSubject(e: T) {
    this.subject = e ? e.pos || e : this.pos;
    this.offset = { x: 0, y: 0 };
    if (e && e.w) {
      this.offset.x += e.w / 2;
      this.offset.y += e.h / 2;
    }

    // if (e && e.anchor) {
    //   this.offset.x -= e.anchor.x;
    //   this.offset.y -= e.anchor.y;
    // }
  }

  focus() {
    const maxX = this.worldSize.w - this.w;
    const centeredX = this.subject.x + this.offset.x - this.w/2;
    const x = -math.clamp(centeredX, 0, maxX);

    const maxY = this.worldSize.h - this.h;
    const centeredY = this.subject.y + this.offset.y - this.h / 2;
    const y = -math.clamp(centeredY, 0, maxY);
    this.pos.x = x;
    this.pos.y = y;
  }

  update(dt: number, t: number): void {
    super.update(dt, t);
    if(this.subject) {
        this.focus();
    }
  }
}


// new Camera({ x: 0, y:0}, {w: 0, h: 0})