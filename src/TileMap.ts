import Entity from "./Entity";
import { Bounds } from "./interfaces";
export default class TileMap {
  mapW: number;
  mapH: number;
  tileSize: number;
  children: Entity[] = [];
  constructor(mapW: number, mapH: number, tileSize: number) {
    this.mapW = mapW;
    this.mapH = mapH;
    this.tileSize = tileSize;
    for (let y = 0; y < this.mapH; y++) {
      for (let x = 0; x < this.mapW; x++) {
        const e = new Entity(tileSize, tileSize, "transparent");
        e.pos.x = x * tileSize;
        e.pos.y = y * tileSize;
        this.children.push(e);
      }
    }
  }

  pixelToMapPosition(x: number, y: number) {
    return {
      x: Math.floor(x / this.tileSize),
      y: Math.floor(y / this.tileSize),
    };
  }

  mapToPixelPosition(x: number, y: number) {
    return {
      x: x * this.tileSize,
      y: y * this.tileSize,
    };
  }

  getTileAtMapPosition(x: number, y: number) {
    const tile = this.children[y * this.mapW + x];
    return this.children[y * this.mapW + x];
  }

  getTileAtPixelPosition(x: number, y: number) {
    const pos = this.pixelToMapPosition(x, y);
    return this.getTileAtMapPosition(pos.x, pos.y);
  }

  getTileAtCorners(bounds: Bounds) {
    return [
      [bounds.x, bounds.y],
      [bounds.x + bounds.w, bounds.y],
      [bounds.x, bounds.y + bounds.h],
      [bounds.x + bounds.w, bounds.y + bounds.h],
    ].map(([x, y]) => this.getTileAtPixelPosition(x, y));
  }

  render(ctx: CanvasRenderingContext2D) {
    this.children.forEach((e) => e.render(ctx));
  }
}
