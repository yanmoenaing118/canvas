import Texture from "./Texture";
import TileMap from "./TileMap";
import { Frame, Position } from "./models";
import math from "./utils/math";

export default class Level extends TileMap {
  bounds = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  };
  speed: number = 0.15;
  dir: Position = {
    x: 1,
    y: 0,
  };
  constructor(w: number, h: number) {
    const level: Frame[] = [];
    const tileSize = 32;
    const tile = new Texture("./images/tiles.png");
    const mapW = Math.ceil(w / tileSize);
    const mapH = Math.ceil(h / tileSize);

    const topBottom = { x: 2, y: 1 };
    const leftFrame = { x: 1, y: 1 };
    const rightFrame = { x: 3, y: 1 };
    const bricks = { x: 4, y: 1 };
    const empty = { x: 3, y: 0 };

    for (let x = 0; x < mapW * mapH; x++) {
      const top = x < mapW;
      const bottom = x >= mapW * mapH - mapW;
      const left = x % mapW == 0;
      const right = x % mapW == mapW - 1;
      const isBrick = ((x / mapW) | 0) === 1;
      if (top) {
        level.push(topBottom);
      } else if (bottom) {
        level.push(topBottom);
      } else if (left) {
        level.push(leftFrame);
      } else if (right) {
        level.push(rightFrame);
      } else if (isBrick) {
        level.push(bricks);
      } else {
        level.push({x: math.rand(1,5),y: 0});
      }
    }
    super(level, mapW, mapH, tileSize, tileSize, tile);

    this.bounds = {
      left: tileSize,
      right: w - tileSize * 2,
      top: tileSize * 2,
      bottom: h - tileSize * 2,
    };
  }
}
