import { CANVAS_HEIGHT, CANVAS_WIDTH, TILE_SIZE } from "../constants";
import Texture from "../pop/Texture";
import TileMap from "../pop/TileMap";
import math from "../pop/utils/math";

const mapW = CANVAS_WIDTH / TILE_SIZE;
const mapH = CANVAS_HEIGHT / TILE_SIZE;
const tileSize = TILE_SIZE;
const texture = new Texture("images/bravedigger-tiles.png");

function getById(id: string | number): any {
  return tileIndexes.find((frame) => frame.id === id);
}

const tileIndexes = [
  { id: "empty", x: 0, y: 2, walkable: true },
  { id: "wall", x: 2, y: 2, walkable: false },
  { id: "wall_end", x: 3, y: 2, walkable: false },
];
class Dungeon extends TileMap {
  constructor() {
    const level = new Array(mapW * mapH).fill("empty");

    console.log("x,y,index");
    for (let y = 0; y < mapH; y++) {
      for (let x = 0; x < mapW; x++) {
        if (y == 0 || x == 0 || y == mapH - 1 || x == mapW - 1) {
          level[y * mapW + x] = "wall";
          continue;
        }

        if (y % 2 || x % 2 || math.randOneIn(4)) {
          continue;
        }

        level[y * mapW + x] = "wall";

        const [xo, yo] = math.randOneFrom([
          [0, -1],
          [0, 1],
          [1, 0],
          [-1, 0],
        ]);
        level[(y + yo) * mapW + (x + xo)] = "wall";
      }
    }

    for (let y = 0; y < mapH - 1; y++) {
      for (let x = 0; x < mapW; x++) {
        const below = level[(y + 1) * mapW + x];
        const me = level[y * mapW + x];
        if (me === "wall" && below !== "wall") {
          level[y * mapW + x] = "wall_end";
        }
      }
    }

    super(
      level.map((i) => getById(i)),
      mapW,
      mapH,
      tileSize,
      tileSize,
      texture
    );
  }
}

export default Dungeon;
