import { ctx } from ".";
import KeyControls from "./KeyControls";
import Level from "./Level";
import Vec2 from "./Vec2";
import { CELLSIZE, HEIGHT, WIDTH } from "./constants";
import { clamp } from "./utils";

export default class Player {
  pos: Vec2 = { x: 0, y: 0 };
  w: number = CELLSIZE;
  h: number = CELLSIZE;
  controls: KeyControls;
  map: Level;
  speed: number = 320;

  topleft_pos: Vec2 = {
    x: this.pos.x,
    y: this.pos.y,
  };
  topright_pos: Vec2 = {
    x: this.pos.x + this.w,
    y: this.pos.y,
  };
  bottomleft_pos: Vec2 = {
    x: this.pos.x,
    y: this.pos.y + this.h,
  };
  bottomright_pos: Vec2 = {
    x: this.pos.x + this.w,
    y: this.pos.y + this.h,
  };

  constructor(controls: KeyControls, map: Level) {
    this.controls = controls;
    this.map = map;
    this.pos.x = CELLSIZE * 2;
    this.pos.y = CELLSIZE * 1;
  }

  update(dt: number) {
    this.pos.y += this.controls.y * dt * this.speed;

    let mx = this.controls.x * dt * this.speed;

    /**
     * from pixel position to map position
     * using map position x*y get the tile
     */

    let topLeftXY = this.map.getMapXY(this.pos.x - this.w / 2 + mx, this.pos.y);
    let topRightXY = this.map.getMapXY(
      this.pos.x + this.w / 2 + mx,
      this.pos.y
    );

    // console.log('topleft', JSON.stringify(topLeftXY), mx);
    console.log("topright", JSON.stringify(topRightXY));

    let topLeftTile = this.map.getTileAtMapXY(topLeftXY.x, topLeftXY.y);
    let topRightTile = this.map.getTileAtMapXY(topRightXY.x, topRightXY.y);

    if (topLeftTile.solid) {
      console.log("left is solid ", topLeftTile.solid);
      mx = 0;
    } else if (topRightTile.solid) {
      mx = 0;
    }

    /**
     * Move
     */
    this.pos.x += mx;

    this.pos.x = clamp(this.pos.x, 0, WIDTH - this.w);
    this.pos.y = clamp(this.pos.y, 0, HEIGHT - this.h);
  }

  render() {
    ctx.save();
    ctx.strokeStyle = "red";
    ctx.translate(this.pos.x, this.pos.y);
    ctx.strokeRect(0, 0, this.w, this.h);
    ctx.restore();
  }
}
