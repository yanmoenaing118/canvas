import Rect from "./Rect";
import { HEIGHT, WIDTH } from "./constants";

export default class Target extends Rect {
  constructor() {
    super();
    this.pos.x = Math.floor(Math.random() * WIDTH - this.w);
    this.pos.y = Math.floor(Math.random() * HEIGHT - this.h);
    this.style.fill = "red";
  }

  relocate() {
    this.pos.x = Math.floor(Math.random() * WIDTH - this.w);
    this.pos.y = Math.floor(Math.random() * HEIGHT - this.h);
  }

  update(dt: number, t: number): void {
    this.pos.x += Math.sin(t * 10) * dt * 320;
    this.pos.y += Math.sin(t * 12) * dt * 230;
  }
}
