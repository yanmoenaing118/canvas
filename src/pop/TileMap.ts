import Container from "./Container";
import Texture from "./Texture";
import TileSprite from "./TileSprite";
import { Frame } from "./models";
import math from "./utils/math";

export default class TileMap extends Container {
  mapW: number;
  mapH: number;
  tileW: number;
  tileH: number;
  w: number;
  h: number;
  constructor(
    frames: Frame[],
    mapW: number,
    mapH: number,
    tileW: number,
    tileH: number,
    texture: Texture
  ) {
    super();
    this.mapW = mapW;
    this.mapH = mapH;
    this.tileW = tileW;
    this.tileH = tileH;
    this.w = this.mapW * this.tileW;
    this.h = this.mapH * this.tileH;

    this.children = frames.map((frame, i) => {
      const tileSprite = new TileSprite(texture, this.tileW, this.tileH);
      tileSprite.frame = frame;
      tileSprite.pos.x = i % this.mapW * this.tileW;
      tileSprite.pos.y = Math.floor(i / this.mapW) * this.tileH;
      return tileSprite;
    });
  }
}
