import { ctx } from ".";
import Entity from "./Entity";
import Vec2 from "./Vec2";
import { CELLSIZE, HEIGHT, WIDTH } from "./constants";

export default class Bat extends Entity {
  point: Vec2 = { x: 0, y: 0 };
  speed = 100;
  constructor() {
    super();
    this.pos.x = CELLSIZE * 2;
    this.pos.y = CELLSIZE * 3;
    this.point = this.makeWaypoint();
  }

  makeWaypoint() {
    return {
      x: Math.random() * WIDTH - this.w,
      y: Math.random() * HEIGHT - this.h,
    };
  }

  update(dt: number, t: number): void {
    const dx = this.point.x - this.pos.x;
    const dy = this.point.y - this.pos.y;
    const step = dt * this.speed;

    let mx = 0;
    let my = 0;

    mx = dx < 0 ? -step : step;
    my = dy < 0 ? -step : step;

    this.pos.x += mx;
    this.pos.y += my;
    if (Math.abs(this.point.x - this.pos.x) < this.w * 0.5 && Math.abs(this.pos.y - this.point.y) < this.h * 0.5) {
      this.point = this.makeWaypoint();
    }
  }

  render() {
    ctx.save();
    ctx.fillStyle = "rgba(222,120,20,0.2)";
    ctx.translate(this.pos.x, this.pos.y);
    ctx.fillRect(0, 0, this.w, this.h);
    ctx.restore();

    // ctx.save();
    // ctx.fillStyle = "black";
    // ctx.translate(this.point.x, this.point.y);
    // ctx.fillRect(0, 0, this.w, this.h);
    // ctx.restore();
  }
}
