import Entity from "./Entity";
import KeyControls from "./KeyControls";
import { CELL_HEIGH, CELL_WIDTH } from "./constants";

export default class Player extends Entity {
  speed: number = 320;
  controls: KeyControls;
  constructor(controls: KeyControls) {
    super(CELL_WIDTH, CELL_HEIGH, "green");
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
  }

  update(dt: number) {
    const mx = this.controls.x * dt * this.speed;
    const my = this.controls.y * dt * this.speed;

    this.pos.x += mx;
    this.pos.y += my;
  }
}
