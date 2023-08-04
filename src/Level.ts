import Texture from "./pop/Texture";
import TileMap from "./pop/TileMap";
import TileSprite from "./pop/TileSprite";
import { Frame, Position } from "./pop/models";
import math from "./pop/utils/math";
import { js as EasyStarPath } from "easystarjs";


const path = new EasyStarPath();


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
  blank: Frame = {
    x: 0,
    y: 0,
  };
  lastTile!: TileSprite;
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
        level.push({ x: math.rand(1, 5), y: 0 });
      }
    }
    super(level, mapW, mapH, tileSize, tileSize, tile);

    const grid = [];

    for(let i = 0; i < mapW * mapH; i+= mapW) {
      grid.push(level.slice(i, i + mapW))
    }


    this.bounds = {
      left: tileSize,
      right: w - tileSize * 2,
      top: tileSize * 2,
      bottom: h - tileSize * 2,
    };
  }

  checkGround(pos: Position) {
    const tile = this.tileAtPixelPosition(pos);
    if(tile == this.lastTile) {
      return 'checked';
    }
    this.lastTile = tile;
    if(tile.frame != this.blank){
      this.setFrameAtPixelPosition(pos, this.blank)
      return 'solid';
    }
    return 'cleared';
  }
}
