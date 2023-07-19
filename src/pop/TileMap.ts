import Container from "./Container";
import Texture from "./Texture";
import TileSprite from "./TileSprite";
import { Frame, Position, TileBound } from "./models";

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
      tileSprite.pos.x = (i % this.mapW) * this.tileW;
      tileSprite.pos.y = Math.floor(i / this.mapW) * this.tileH;
      return tileSprite;
    });
  }

  pixelToMapPosition(pos: Position) {
    return {
      x: Math.floor(pos.x / this.tileW),
      y: Math.floor(pos.y / this.tileH),
    };
  }

  mapPositionToPixel(mapPos: Position) {
    return {
      x: mapPos.x * this.tileW,
      y: mapPos.y * this.tileH,
    };
  }

  tileAtMapPosition(mapPosition: Position): TileSprite {
    return this.children[mapPosition.y * this.mapW + mapPosition.x];
  }

  tileAtPixelPosition(pos: Position): TileSprite {
    return this.tileAtMapPosition(this.pixelToMapPosition(pos));
  }

  setFrameAtMapPosition(pos: Position, frame: Frame) {
    const tile = this.tileAtMapPosition(pos);
    tile.frame = frame;
    return tile;
  }

  setFrameAtPixelPosition(pos: Position, frame: Frame) {
    return this.setFrameAtMapPosition(this.pixelToMapPosition(pos), frame);
  }

  tilesAtCorners(bounds: TileBound, xo: number, yo: number): TileSprite[] {
    return [
      [bounds.x, bounds.y],
      [bounds.x + bounds.w, bounds.y],
      [bounds.x + bounds.w, bounds.y + bounds.h],
      [bounds.x, bounds.y + bounds.h],
    ].map(([x, y]) =>
      this.tileAtPixelPosition({
        x: x + xo,
        y: y + yo,
      })
    );
  }
}
