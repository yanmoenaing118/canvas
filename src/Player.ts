import KeyControls from "./KeyControls";
import Rect from "./Rect";
import TileMap from "./TileMap";
import TileSprite from "./TileSprite";
import { clamp, tilesAtCorners } from "./utils";

class Player extends Rect {
  cornerTiles: Rect[] = [];
  printed = false;
  speed = 640;
  controls: KeyControls;
  map: TileMap;
  constructor(controls: KeyControls, map: TileMap) {
    super();
    this.controls = controls;
    this.map = map;

    this.cornerTiles = [0, 1, 2, 3].map(() => new Rect());
  }

  update(dt: number, t: number): void {
    /**
     * can move to left
     * - get the distance the player is going to make = (ox)
     * - get TR corner corner of the player (TR.x)
     * - By using the going to move distance + TR.x positon,
     *   get tile at the TR corner of the player (tileAtLeft)
     * - if tileAtLeft is walkable tile, move.x = ox (the player move ox pixel)
     *   else 
     *    get the gap between TR.x and tileAtLeft (gap)
     *    gap = math.abs(pos.x - tileAtleft.pos.x) - w
     *    move.x = 0 (the player make no move), 
     */
    const ox = dt * this.speed * this.controls.x;

    const move = { x: 0, y: 0 };
    const TRPos = { x: this.pos.x + this.w, y: this.pos.y };
    const TRTile = this.map.tileAtPixelPosition({
      x: TRPos.x + ox,
      y: TRPos.y,
    });

  

    const canwalkLeft = TRTile.frame.meta?.walkable;

    if(canwalkLeft){
      move.x = ox;
    } else {
      const gap = Math.abs(this.pos.x - TRTile.pos.x) - this.w;
      move.x = gap;
    }

    const infoText = `${TRTile.frame.meta?.walkable ? 'Can move ' + ox : 'Cannot move ' + ox}`
    console.log(infoText)

    this.pos.x += move.x;

    this.pos.x = clamp(this.pos.x, 0, this.map.w - this.w);
    // this.pos.y = clamp(this.pos.y, 0, this.map.h - this.h);
  }
}


export default Player;