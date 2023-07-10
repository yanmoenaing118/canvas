import KeyControls from "./KeyControls";
import Rect from "./Rect";
import TileMap from "./TileMap";
import TileSprite from "./TileSprite";
import { CELLSIZE } from "./constants";
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
     * for left / right
     * - get the distance the player is going to make = (ox)
     *
     * can move to left
     * - get TR corner of the player (TR.x)
     * - By using the going to move distance + TR.x positon,
     *   get tile at the TR corner of the player (tileAtLeft)
     * - if tileAtLeft is walkable tile, move.x = ox (the player move ox pixel)
     *   else
     *    get the gap between TR.x and tileAtLeft (gap)
     *    gap = math.abs(pos.x - tileAtleft.pos.x) - w
     *    move.x = 0 (the player make no move),
     *
     * can move to right
     * - get TL corner of the player (TL.x)
     * - By using ox + TL.x, get tile at TL corner of the player (tileAtRight)
     * - if tileAtLeft is walkabe tile, move.x = ox (the player move ox pixel)
     *   else 
     *    get the gap between TL.x and tileAtRight (gap)
     *    gap = (tileAtLeft.pox.x + tileAtLeft.w) - TL.x 
     *
     */
    const ox = dt * this.speed * this.controls.x;
    const oy = dt * this.speed * this.controls.y;

    const move = { x: ox, y: oy };

    /**
     * Moving Left
     */
    const TRPos = { x: this.pos.x + this.w, y: this.pos.y };
    const TRTile = this.map.tileAtPixelPosition({
      x: TRPos.x + ox,
      y: TRPos.y,
    });
    const canwalkLeft = TRTile.frame.meta?.walkable;

    /**
     * Moving Right
     */
    const TLPos = { x: this.pos.x, y: this.pos.y };
    const TLTile = this.map.tileAtPixelPosition({ x: TLPos.x + ox - CELLSIZE, y: TLPos.y });
    const canwalkRight = TLTile.frame.meta?.walkable;


    if(this.controls.x == 1 && canwalkLeft){
      console.log('h',ox)
      move.x = ox;
    } else if (this.controls.x == 1 && !canwalkLeft) {
      const gap = Math.abs(this.pos.x - TRTile.pos.x) - this.w;
      move.x = gap;
    }

    if(this.controls.x == -1 &&  canwalkRight) {
      console.log('rh',ox)
      move.x = ox;
    } else if(this.controls.x == - 1 && !canwalkRight ){
      const gap =( TLTile.pos.x + TLTile.w ) - TLPos.x 
      move.x = gap;
      console.log('cannot move right')
    }

    const infoTextLeft = `${
      TRTile.frame.meta?.walkable ? "Can move left " + ox : "Cannot move left" + ox
    }`;
    // console.log(infoTextLeft)

    console.log(move.x);
    
    this.pos.x += move.x;
    this.pos.y += move.y;

    this.pos.x = clamp(this.pos.x, 0, this.map.w - this.w);
    this.pos.y = clamp(this.pos.y, 0, this.map.h - this.h);
  }
}


export default Player;