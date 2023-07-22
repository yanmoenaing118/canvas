import Rect from "./Rect";
import Shooter from "./Shooter";
import { HEIGHT, WIDTH } from "./constants";
import { center } from "./utils";

export default class Target extends Rect {
  shooter: Shooter;
  dead = false;
  speed = 0.5;
  constructor(shooter: Shooter) {
    super();
    this.w = 50;
    this.h = 50;
    this.pos.x = Math.floor(Math.random() * (WIDTH - this.w));
    this.pos.y = Math.floor(Math.random() * (HEIGHT - this.h));
    this.style.fill = "rgb(222,100,100,0.9)";
    this.shooter = shooter;
    this.speed = Math.random() * 100;
  }

  relocate() {
    this.pos.x = Math.floor(Math.random() * WIDTH - this.w * 2);
    this.pos.y = Math.floor(Math.random() * HEIGHT - this.h * 2);
  }

  update(dt: number, t: number): void {

    const dx = center(this.shooter).x - center(this).x;
    const dy = center(this.shooter).y - center(this).y;
    const step = this.speed * dt;
    let isXClose = Math.abs(dx) <= step;
    let isYClose = Math.abs(dy) <= step;

    if (!isXClose) {
      this.pos.x += this.speed * (dx > 0 ? 1 : -1) * dt;
    }

    if (!isYClose) {
      this.pos.y += this.speed * (dy > 0 ? 1 : -1) * dt;
    }

    this.pos.x += Math.sin(t * 10) * dt * 320;
    this.pos.y += Math.sin(t * 12) * dt * 230;

    this.speed += dt * 10;
  }
}
