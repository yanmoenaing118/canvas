import Bullet from "./Bullet";
import KeyControls from "./KeyControls";
import Shooter from "./Shooter";
import Target from "./Target";
import { HEIGHT, MAX_DELTA, WIDTH } from "./constants";
const canvas = document.createElement("canvas") as HTMLCanvasElement;
export const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
document.body.appendChild(canvas);

canvas.style.border = "1px solid black";

canvas.width = WIDTH;
canvas.height = HEIGHT;

let dt = 0;
let t = 0;

/**
 * Shooter is at the center of th canvas
 * A random target will appear on the screen
 * Shooter will fire bullet towards the target
 * If the target is hit, the target will be relocated
 * Shooter will again fire bullets toward the target
 * Shooter will fire bullet at a rate of .3s interval
 */

const controls = new KeyControls();
const shooter = new Shooter();
const target = new Target();
const bullet = new Bullet();

function loop(ellapsedTime: number) {
  dt = Math.min(MAX_DELTA, (ellapsedTime - t) * 0.001);
  t = ellapsedTime;

  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  target.update(dt, t * 0.001);
  shooter.update(dt, t * 0.001);
  bullet.update(dt, t * 0.001);

  target.render(ctx);
  shooter.render(ctx);
  bullet.render(ctx);

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
