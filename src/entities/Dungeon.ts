import Texture from "../pop/Texture";
import TileMap from "../pop/TileMap";
import { Frame } from "../pop/models";
import math from "../pop/utils/math";

const mapW = 14;
const mapH = 10;
const tileSize = 48;
const texture = new Texture("images/bravedigger-tiles.png");

function getById(id: string | number): any {
  return tileIndexes.find((frame) => frame.id === id);
}

const tileIndexes = [
  { id: "empty", x: 0, y: 2 },
  { id: "wall", x: 2, y: 2 },
  { id: "wall_end", x: 3, y: 2 },
];

class Dungeon extends TileMap {
  constructor() {
    const level = new Array(mapW * mapH).fill(2);

    for (let y = 0; y < mapH; y++) {
      for (let x = 0; x < mapW; x++) {
        level[y * mapW + x] = math.randOneFrom([0, 0, 1]);
      }
    }

    super(level.map(i => tileIndexes[i]), mapW, mapH, tileSize, tileSize, texture);
  }
}

export default Dungeon;
