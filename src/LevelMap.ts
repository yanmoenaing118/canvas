import Texture from "./Texture";
import TileMap from "./TileMap";
import { h, w } from "./canvas";
import { TileSpriteFrame } from "./classes";

export default class LevelMap extends TileMap {
  constructor() {
    const tileW = 64;
    const tileH = 64;

    const mapW = w / tileW;
    const mapH = h / tileH;
    const level: TileSpriteFrame[] = [];

    for(let i = 0; i < mapH; i++) {
      for(let j = 0 ; j < mapW; j++) {
        const index = (i * mapW) + j;
        level[index] = {
          x: Math.round(Math.random() * mapW),
          y: Math.round(Math.random() * mapH)
        }
      }
    }

    console.log(level);
    super(level, new Texture("dungeon.png"), mapW, mapH, tileW, tileH);
  }


}
