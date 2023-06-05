import Texture from "./Texture";
import TileMap from "./TileMap";
import { Frame } from "./models";
import math from "./utils/math";

export default class Level extends TileMap {
  constructor(w: number, h: number) {
    const level: Frame[] = [];
    const tileSize = 32;
    const tile = new Texture("./images/tiles.png");
    const mapW = Math.floor(w / tileSize);
    const mapH = Math.floor(h / tileSize);

    const topBottom = { x: 2, y: 1 };
    const leftFrame = { x: 1, y: 1 };
    const rightFrame = { x: 3, y: 1 };
    const bricks = { x: 4, y: 1 };
    const empty = { x: 1, y: 0 };

    const brickRow = 2;

    for (let x = 0; x < mapW * mapH; x++) {
      const top = x < mapW;
      const bottom = x >= mapW * mapH - mapW;
      const left = x % mapW == 0;
      const right = x % mapW == mapW - 1;
      const isBrick =
        x / mapW >= brickRow - 1 && x / mapW <= (mapW * brickRow - 1) / mapW;
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
        level.push(empty);
      }
    }

    console.log(level);

    super(level, mapW, mapH, tileSize, tileSize, tile);

    // const tileMap = new TileMap(level, mapW, mapH, tileSize, tileSize, tile);
  }
}
