import Entity from "./Entity";

export default class TileMap extends Entity {
  constructor(mapW: number, mapH: number, tileSize: number) {
    super();
    this.w = mapW * tileSize;
    this.h = mapH * tileSize;
  }
}
