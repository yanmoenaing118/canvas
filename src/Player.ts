import KeyControls from "./KeyControls";
import Rect from "./Rect";
import TileMap from "./TileMap";
import TileSprite from "./TileSprite";
import { tilesAtCorners } from "./utils";

class Player extends Rect {
  cornerTiles: Rect[] = [];
  printed = false;
  speed = 320;
  controls: KeyControls;
  map: TileMap;
  constructor(controls: KeyControls, map: TileMap) {
    super();
    this.controls = controls;
    this.map = map;

    this.cornerTiles = [0, 1, 2, 3].map(() => new Rect());
  }

  update(dt: number, t: number): void {
    const ox = dt * this.speed * this.controls.x;
    const oy = dt * this.speed * this.controls.y;

    const cornerTiles = tilesAtCorners(this, this.map, ox, oy);

    cornerTiles.forEach((tile, i) => {
      this.cornerTiles[i].style.fill = "rgba(225,225,225,0.3)";
      this.cornerTiles[i].pos.x = tile.pos.x;
      this.cornerTiles[i].pos.y = tile.pos.y;
    });

    const blocked = cornerTiles.some((t) => t && !t.frame.meta?.walkable);

    const move = { x: 0, y: 0 };

    if (blocked) {
      move.x = 0;
      move.y = 0;
      console.log('blocking to move', this.pos.x, this.pos.y, cornerTiles[0].pos.x)
    } else {
      move.x = ox;
      move.y = oy;
      console.log("no one is blocking you to move", this.pos.x, this.pos.y, cornerTiles[0].pos.x);
    }

    if(ox || oy) {
        console.log(ox,oy);
        const blocked = cornerTiles.some((t) => t && !t.frame.meta?.walkable);
        // debugger;
    }

    this.pos.x += move.x;
    this.pos.y += move.y;
  }
}


export default Player;