import Entity from "./Entity";
import KeyControls from "./KeyControls";
import { CELL_HEIGH, CELL_WIDTH, HEIGHT, WIDTH } from "./constants";
import { clamp } from "./helpers";

export default class Player extends Entity {
  speed: number = 1200;
  controls: KeyControls;
  constructor(controls: KeyControls) {
    super(CELL_WIDTH, CELL_HEIGH, "rgba(89,90,12,0.3)");
    this.controls = controls;

    // offset for hit box
    const ox = 12;
    const oy = 12;
    this.hitBox = {
        x: ox,
        y: oy,
        w: this.w - ox * 2,
        h: this.h - oy * 2
    }
    this.debugMode = true;
    this.pos.y = HEIGHT - this.w
    this.pos.x = this.w * 3  + this.w /2;
  }

  update(dt: number, t: number) {
    const mx = this.controls.x * dt * this.speed + Math.sin(t * 50);
    const my = this.controls.y * dt * this.speed + Math.sin(t * 50)

    this.pos.x += mx;
    this.pos.y += my;

    this.pos.x = clamp(this.pos.x, 0, WIDTH - this.w);
    this.pos.y = clamp(this.pos.y, 0, HEIGHT - this.h);
  }
}
