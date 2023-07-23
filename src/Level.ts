import Rect from "./Rect";
import TileMap from "./TileMap";
import { CELLSIZE } from "./constants";

export default class Level extends TileMap {
  constructor(w: number, h: number) {
    const mapW = Math.floor(w / CELLSIZE);
    const mapH = Math.floor(h / CELLSIZE);
    super(mapW, mapH, CELLSIZE);

    for (let y = 0; y < mapH; y++) {
      for (let x = 0; x < mapW; x++) {
        let fill = "black";
        if (x % 2 || y % 2) {
          fill = "pink";
        }

        if (x % 2 && y % 2 && x == y) {
          fill = "orange";
        }
        const rect = new Rect(fill);
        rect.pos.x = x * this.tileSize;
        rect.pos.y = y * this.tileSize
        this.children[y * mapW + x] = rect;
      }
    }
  }

  

}
