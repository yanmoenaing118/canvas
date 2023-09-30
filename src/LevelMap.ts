import Texture from "./Texture";
import TileMap from "./TileMap";
import { h, w } from "./canvas";
import { TileSpriteFrame, Vec2 } from "./classes";

function getTile(char: string) {
  switch (char) {
    case "#":
      return { x: 8, y: 0 };
    case "B":
      return { x: 9, y: 2 };
    case "C":
      return { x: 1, y: 6 };
    case "M":
      return { x: 4, y: 2 };
    case "D":
      return { x: 5, y: 1 };
    case "P":
      return { x: 1, y: 1 };
    default:
      return { x: 1, y: 1 };
  }
}
export default class LevelMap extends TileMap {
  playerPos: Vec2;
  constructor() {
    const tileW = 64;
    const tileH = 64;

    const ascii = `
############
#          #
#          #
#          #
#          #
#          #
#P         #
BBBBBBBBBBBB`;

    const mapW = w / tileW;
    const mapH = h / tileH;
    let level: TileSpriteFrame[] = [];

    const cells = ascii
      .split("\n")
      .slice(1)
      .map((row) => row.split(""));
    let playPos: Vec2 = new Vec2(0, 0);

    for (let i = 0; i < cells.length; i++) {
      for (let j = 0; j < cells[i].length; j++) {
        const tile = getTile(cells[i][j]);
        level[i * cells[i].length + j] = tile;
        if (cells[i][j] == "P") {
          playPos = new Vec2(j * 64, i * 64);
        }
      }
    }

    super(level, new Texture("dungeon.png"), mapW, mapH, tileW, tileH);

    this.playerPos = playPos;
  }
}
