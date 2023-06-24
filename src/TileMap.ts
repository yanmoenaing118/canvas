import TileSprite from "./TileSprite";
import Vec2 from "./Vec2";

/**
 * a TileMap is just a container with TileSprite children
 */

export default class TileMap {
  pos: Vec2 = new Vec2(0, 0);
  chldren: TileSprite[] = [];
  mapW: number;
  mapH: number;
  tileW: number;
  tileH: number;
  w: number;
  h: number;
  constructor(
    img: HTMLImageElement,
    mapW: number,
    mapH: number,
    tileW: number,
    tileH: number
  ) {
    this.mapW = mapW;
    this.mapH = mapH;
    this.tileW = tileW;
    this.tileH = tileH;
    this.w = mapW * tileW;
    this.h = mapH * tileH;
  }
}
