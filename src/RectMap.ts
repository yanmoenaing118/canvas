import Rect from "./Rect";
import { TileSpriteFrame } from "./classes";

export type Bounds = {
  x: number;
  y: number;
  w: number;
  h: number;
};
export default class RectMap {
  children: Rect[];

  constructor(
    level: TileSpriteFrame[],
    public mapW: number,
    public mapH: number,
    public tileW: number,
    public tileH: number
  ) {
    this.children = [];
    level.forEach((tile, i) => {
      const color = (tile.color as string) || "black";

      const rect = new Rect(tile.x, tile.y, tileW, tileH, color);

      if (color == "red") {
        rect.walkable = false;
      }
      this.children.push(rect);
    });
  }

  render(ctx: CanvasRenderingContext2D) {
    this.children.forEach((rect) => rect.render(ctx));
  }

  tileAtPixelPosition(x: number, y: number) {
    return this.children[
      Math.floor(y / this.tileH) * this.mapW + Math.floor(x / this.tileW)
    ];
  }

  tilesAtCorner(bounds: Bounds, ox: number, oy: number) {
    return [
      [bounds.x, bounds.y], // tl
      [bounds.x + bounds.w, bounds.y], // tr
      [bounds.x, bounds.y + bounds.h], // bl,
      [bounds.x + bounds.w, bounds.y + bounds.h], // br
    ].map(([x, y]) => {
      return this.tileAtPixelPosition(x + ox, y + oy);
    });
  }
}
