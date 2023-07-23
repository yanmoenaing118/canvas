import Entity from "./Entity";

export default class TileMap extends Entity {
  mapW: number;
  mapH: number;
  tileSize: number;
  children: Entity[] = [];
  constructor(mapW: number, mapH: number, tileSize: number) {
    super();
    this.w = mapW * tileSize;
    this.h = mapH * tileSize;
    this.mapH = mapH;
    this.mapW = mapW;
    this.tileSize = tileSize;
  }

  render(ctx: CanvasRenderingContext2D): void {
      this.children.forEach(t => t.render(ctx))
  }
}
