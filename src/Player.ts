import { ctx } from ".";
import KeyControls from "./KeyControls";
import  Level, { Rect } from "./Level";
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

  rects: Rect[] = [];

  constructor(controls: KeyControls, map: Level) {
    this.controls = controls;
    this.map = map;
    this.pos.x = CELLSIZE * 2;
    this.pos.y = CELLSIZE * 1;
    // this.rects = [0,0,0].map(r => new Rect());
  }

  update(dt: number) {
    // this.pos.y += this.controls.y * dt * this.speed;

    let mx = this.controls.x * dt * this.speed;
    let my = this.controls.y * dt * this.speed;

    const newX = this.pos.x + mx;
    const newY = this.pos.y + my;

    /**
     * for horizontal Left and Right, I have to check
     *
     * for Left side
     * topLeft corner
     * bottomLeft corner
     *
     * for Right side
     * topRight corner
     * topBottom corner
     *
     */

    const topLeftMapXY = this.map.getMapXY(newX, this.pos.y);
    topLeftMapXY.x = Math.floor(topLeftMapXY.x);
    topLeftMapXY.y = Math.floor(topLeftMapXY.y);
    const topLeftTile = this.map.getTileAtMapXY(topLeftMapXY.x, topLeftMapXY.y);

    // console.log('topleft ', JSON.stringify(topLeftMapXY));

    const bottomLeftXY = this.map.getMapXY(this.pos.x, this.pos.y + this.h - 0.9);
    bottomLeftXY.x = Math.floor(bottomLeftXY.x);
    bottomLeftXY.y = Math.floor(bottomLeftXY.y);
    const bottomLeftTile = this.map.getTileAtMapXY(bottomLeftXY.x,bottomLeftXY.y);

    if ((topLeftTile && topLeftTile.solid) || ( bottomLeftTile && bottomLeftTile.solid)) {
      console.log()
      mx = 0;
    }



    this.pos.x += mx;
    this.pos.y += my;

    this.pos.x = clamp(this.pos.x, 0, WIDTH - this.w);
    this.pos.y = clamp(this.pos.y, 0, HEIGHT - this.h);
  }

  render() {
    // this.rects.forEach(r => r.render())

    ctx.save();
    ctx.strokeStyle = "purple";
    ctx.translate(this.pos.x, this.pos.y);
    ctx.strokeRect(0, 0, this.w, this.h);
    ctx.restore();
  }
}
