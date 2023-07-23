import Entity from "./Entity";

export default class TileSprite extends Entity {
  texture: HTMLImageElement;
  frame: { x: number; y: number };
  constructor(texture: HTMLImageElement, frame: { x: number; y: number }) {
    super();
    this.texture = texture;
    this.frame = frame;
  }
}
