import Entity from "./Entity";
import { renderTileSprite } from "./renderers";

export default class TileSprite extends Entity {
  texture: HTMLImageElement;
  frame: { x: number; y: number };
  constructor(texture: HTMLImageElement, frame: { x: number; y: number }) {
    super();
    this.texture = texture;
    this.frame = frame;
  }

  render(ctx: CanvasRenderingContext2D) {
    renderTileSprite(this, ctx);
  }
}
