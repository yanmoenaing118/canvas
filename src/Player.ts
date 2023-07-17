import Entity from "./Entity";
import KeyControls from "./KeyControls";
import { CELL_HEIGH, CELL_WIDTH } from "./constants";

export default class Player extends Entity {
  speed: number = 320;
  controls: KeyControls;
  constructor(controls: KeyControls) {
    super(CELL_WIDTH, CELL_HEIGH, "green");
    this.controls = controls;
    this.hitBox = {
        x: 4,
        y: 4,
        w: 32 - 8,
        h: 32 - 8
    }
  }

  update(dt: number) {
    const mx = this.controls.x * dt * this.speed;
    const my = this.controls.y * dt * this.speed;

    this.pos.x += mx;
    this.pos.y += my;
  }
}
