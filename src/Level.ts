import TileMap from "./TileMap";
import { CELL_HEIGH, CELL_WIDTH } from "./constants";

export default class Level extends TileMap {
  walls: number[] = [
    2,3, 80, 78, 83, 100, 120, 135, 4, 4, 10, 11, 12, 30, 31, 32, 33, 43, 53,
  ];
  constructor(w: number, h: number) {
    const tileSize = CELL_WIDTH;
    const mapW = w / tileSize;
    const mapH = h / tileSize;
    super(mapW, mapH, tileSize);

    this.walls.forEach((i) => {
      this.children[i].fill = "pink";
    });
  }
}
