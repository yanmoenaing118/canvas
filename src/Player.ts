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
    this.rects = [0,0,0].map(r => new Rect());
  }

  update(dt: number) {
    // this.pos.y += this.controls.y * dt * this.speed;

    let mx = this.controls.x * dt * this.speed;
    let my = this.controls.y * dt * this.speed;

    /**
     * from pixel position to map position
     * using map position x*y get the tile
     */

    // let topLeftXY = this.map.getMapXY(this.pos.x - this.w / 2  + mx, this.pos.y);
    // let topRightXY = this.map.getMapXY( this.pos.x + this.w / 2 + mx, this.pos.y);
    // let bottomLeftXY = this.map.getMapXY(this.pos.x - this.w / 2  + mx, this.pos.y + this.h - this.h/2  + my);

    let { x, y } = this.map.getMapXY(this.pos.x,this.pos.y);

    this.rects = [];

    for(let i = x-1; i <= x+1; i++) {
      for(let j = y-1; j <= y+1; j++) {
          if(i != x || j != y) { 
              const rect = new Rect()
              rect.fill = 'red';
              rect.pos.x = i * CELLSIZE;
              rect.pos.y = j * CELLSIZE;
              this.rects.push(rect);
          }
      }
  }

  if(x) {

  }
    
    
    // console.log('topleft', JSON.stringify(topLeftXY), mx);
    // console.log("topright", JSON.stringify(topRightXY));
    // console.log('bottomLeft', JSON.stringify(bottomLeftXY))
    
    // let topLeftTile = this.map.getTileAtMapXY(topLeftXY.x, topLeftXY.y);
    // let topRightTile = this.map.getTileAtMapXY(topRightXY.x, topRightXY.y);
    // let bottomLeftTile = this.map.getTileAtMapXY(bottomLeftXY.x,bottomLeftXY.y);

    // [topLeftTile, topRightTile, bottomLeftTile].forEach((r, i) => {
     
    //   // this.rects[i].
    // })

    // if (topLeftTile.solid) {
    //   console.log("left is solid ", topLeftTile.solid);
    //   mx = 0;
    // } else if (topRightTile.solid) {
    //   mx = 0;
    // } else if (bottomLeftTile.solid) {
    //   my = 0;
    // }

    /**
     * Move
     */
    this.pos.x += mx;
    this.pos.y += my;

    this.pos.x = clamp(this.pos.x, 0, WIDTH - this.w);
    this.pos.y = clamp(this.pos.y, 0, HEIGHT - this.h);
  }

  render() {


    this.rects.forEach(r => r.render())

    ctx.save();
    ctx.strokeStyle = "purple";
    ctx.translate(this.pos.x, this.pos.y);
    ctx.strokeRect(0, 0, this.w, this.h);
    ctx.restore();
  }
}
