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
  speed: number = 640;

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
    this.pos.x = CELLSIZE * 4;
    this.pos.y = CELLSIZE * 4;
    // this.rects = [0,0,0].map(r => new Rect());
  }

  update(dt: number, t: number) {
    // this.pos.y += this.controls.y * dt * this.speed;

    const sin = t * 15;

    let mx = dt * this.speed * Math.cos(sin)
    let my = dt * this.speed * Math.sin(sin + 1);
    my = 0;


    this.pos.x += mx;
    this.pos.y += my;

    // this.pos.x = clamp(this.pos.x, 0, WIDTH - this.w);
    // this.pos.y = clamp(this.pos.y, 0, HEIGHT - this.h);
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
