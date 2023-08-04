import { js as EasyStar } from "easystarjs";
import Entity from "./Entity";
import TileMap from "./TileMap";
import { CELL_HEIGH, CELL_WIDTH } from "./constants";
import Player from "./Player";

const path = new EasyStar();
export default class Level extends TileMap {
  path: EasyStar;
  constructor(w: number, h: number) {
    const tileSize = CELL_WIDTH;
    const mapW = w / tileSize;
    const mapH = h / tileSize;
    super(mapW, mapH, tileSize);

    const walls: number[] = new Array(30)
      .fill(0)
      .map((i) => Math.round(Math.random() * (mapW * mapH)));

    walls.forEach((i) => {
      this.children[i].fill = "pink";
    });

    let grid: any[] = [];

    for (let i = 0; i < mapW * mapH; i += mapW) {
      grid.push(this.children.slice(i, i + mapW));
    }

    grid = grid.map((arr) =>
      arr.map((e: Entity) => {
        if (e.fill === "pink") {
          return 1;
        }
        return 0;
      })
    );

    console.table(grid);

    path.setGrid(grid);

    path.setAcceptableTiles([0]);

    const start = { x: 0, y: 0 };
    const end = {
      x: Math.floor(Math.random() * mapW),
      y: Math.floor(Math.random() * mapH),
    };

    path.findPath(start.x, start.y, end.x, end.y, (p) => {
      console.log(p)
      if (p === null) {
        console.log("Path was not found.");
      } else {
        console.log("Path was found. The first Point is " + p[0].x + " " + p[0].y);
      }
    });

    this.path = path;
  }

  update(dt: number) {
    path.calculate();
  }
  
}
