import Bullet from "./Bullet";
import { renderGrid } from "./DebugGrid";
import KeyControls from "./KeyControls";
import Shooter from "./Shooter";
import Target from "./Target";
import { CELLSIZE, HEIGHT, MAX_DELTA, WIDTH } from "./constants";
import { angle, center } from "./utils";
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
 * Dead bullets will be removed from bullets array
 *
 * To fire a bullet,
 * we need to know the angle between two points (p1, p2)
 * p1 = targetPosition (x1, y1)
 * p2 = shooterPosition (x2, y2)
 */

const controls = new KeyControls();
const shooter = new Shooter(onFire);
const target = new Target();
let bullets: Bullet[] = [];
const angleToPlayer = angle(target, shooter);

console.log(`
  target: (${target.pos.x}, ${target.pos.y}),
  shooter: (${shooter.pos.x}, ${shooter.pos.y}),
  angle: ${angleToPlayer}

`);

function onFire(this: Shooter) {
  const bullet = new Bullet();
  const angleToPlayer = angle(target, this);
  const shooterCenter = center(shooter);
  bullet.pos = { ...shooterCenter };
  bullet.angle = angleToPlayer;
  bullets.push(bullet);
}

function updateBullets(dt: number, t: number) {
  bullets = bullets.filter((b) => !b.dead);
  bullets.forEach((b) => b.update(dt, t));
}

function renderBullets(ctx: CanvasRenderingContext2D) {
  bullets.forEach((b) => b.render(ctx));
}

function loop(ellapsedTime: number) {
  dt = Math.min(MAX_DELTA, (ellapsedTime - t) * 0.001);
  t = ellapsedTime;

  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  target.update(dt, t * 0.001);
  shooter.update(dt, t * 0.001);
  updateBullets(dt, t * 0.001);

  renderGrid(
    ctx,
    Math.floor(WIDTH / CELLSIZE),
    Math.floor(WIDTH / CELLSIZE),
    CELLSIZE,
    CELLSIZE
  );
  target.render(ctx);
  shooter.render(ctx);
  renderBullets(ctx);

  console.log(bullets.length);
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
