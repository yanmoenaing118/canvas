import Container from "./Container";
import Sprite from "./Sprite";
import { CameraViewport, Position } from "./models";

/**
 * This is the Camera which will follow the entity type 'T'
 * The entity must be an object with pos property in it - a Sprite mostly.
 */

export default class Camera<T extends Position & Sprite> extends Container {
  subject!: T | Position;
  w: number;
  h: number;
  worldSize: CameraViewport;

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
  }

  focus() {}

  update(dt: number, t: number): void {
    super.update(dt, t);
  }
}
