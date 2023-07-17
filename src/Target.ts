import Entity from "./Entity";
import { CELL_HEIGH, CELL_WIDTH, HEIGHT, WIDTH } from "./constants";

export default class Target extends Entity {
  constructor() {
    super(CELL_WIDTH, CELL_HEIGH, "rgba(22,123,120,0.3)");
    this.relocate();
    const ox = 14;
    const oy = 12;
    this.hitBox = {
      x: ox,
      y: oy,
      w: this.w - ox * 2,
      h: this.h - oy * 2,
    };
    this.debugMode = true;
  }

  relocate() {
    this.pos.x = Math.random() * (WIDTH - this.w);
    this.pos.y = Math.random() * (HEIGHT - this.w);
  }

  update(dt: number, t: number) {
    this.pos.x += Math.sin(t * 55 * Math.random() * 10);
    this.pos.y += Math.sin(t * 55 * Math.random() * 10)
  }
}
