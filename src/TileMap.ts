import Entity from "./Entity";
import { CELL_HEIGH, CELL_WIDTH } from "./constants";

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

  render(ctx: CanvasRenderingContext2D) {
    this.children.forEach((e) => e.render(ctx));
  }
}
