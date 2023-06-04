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

    for (let x = 0; x < mapW; x++) {
      for (let y = 0; y < mapH; y++) {
        level.push({
          x: math.rand(5),
          y: math.rand(2),
        });
      }
    }

    super(level, mapW, mapH, tileSize, tileSize, tile);

    // const tileMap = new TileMap(level, mapW, mapH, tileSize, tileSize, tile);
  }
}
