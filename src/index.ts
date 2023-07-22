import Bullet from "./Bullet";
import { renderGrid } from "./DebugGrid";
import KeyControls from "./KeyControls";
import Shooter from "./Shooter";
import Target from "./Target";
import { CELLSIZE, HEIGHT, MAX_DELTA, WIDTH } from "./constants";
import { angle, center, hit } from "./utils";

const canvas = document.createElement("canvas") as HTMLCanvasElement;
export const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
document.body.appendChild(canvas);

canvas.width = WIDTH;
canvas.height = HEIGHT;
const dpr = window.devicePixelRatio;
const rect = canvas.getBoundingClientRect();
canvas.width = rect.width * dpr;
canvas.height = rect.height * dpr;
ctx.scale(dpr, dpr);
canvas.style.width = `${rect.width}px`;
canvas.style.height = `${rect.height}px`;

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

let targets: Target[] = [];
let has = false;


let target: Target = targets[0];
const shooter = new Shooter(onFire, target);


for (let i = 0; i < 100; i++) {
  const t = new Target(shooter);
  targets.push(t);
}

// find nearset
targets.forEach((t) => {
  const betweenCurrent = distance(target, shooter);
  const betweenNext = distance(t, shooter);

  if (betweenNext < betweenCurrent) {
    target = t;
  }
});

function renderTargets(ctx: CanvasRenderingContext2D) {
  targets.forEach((t) => t.render(ctx));
}

function updateTargets(dt: number, t: number) {
  targets = targets.filter((t) => !t.dead);
  targets.forEach((t) => t.update(dt, 0));
}

let bullets: Bullet[] = [];
const angleToPlayer = angle(target, shooter);

console.log(`
  target: (${target.pos.x}, ${target.pos.y}),
  shooter: (${shooter.pos.x}, ${shooter.pos.y}),
  angle: ${angleToPlayer}

`);

function onFire(this: Shooter) {
  if(targets.length == 0) return;
  const bullet = new Bullet();
  const angleToPlayer = angle(target, this);
  const shooterCenter = center(shooter);
  bullet.pos = { ...shooterCenter };
  bullet.angle = angleToPlayer;
  bullets.push(bullet);
  console.log(JSON.stringify(target));
}

function updateBullets(dt: number, t: number) {
  bullets = bullets.filter((b) => !b.dead);
  bullets.forEach((b) => b.update(dt, t));
}

function renderBullets(ctx: CanvasRenderingContext2D) {
  bullets.forEach((b) => b.render(ctx));
}

function distance(t: Target, shooter: Shooter): number {
  const p1 = center(t);
  const p2 = center(shooter);
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance;
}

function loop(ellapsedTime: number) {
  let currTarget = targets[0];
  dt = Math.min(MAX_DELTA, (ellapsedTime - t) * 0.001);
  t = ellapsedTime;

  ctx.clearRect(0, 0, WIDTH + CELLSIZE, HEIGHT + CELLSIZE);

  updateTargets(dt, t * 0.001);
  shooter.update(dt, t * 0.001);
  updateBullets(dt, t * 0.001);

  // find nearset
  if (targets.length) {
    targets.forEach((t) => {
      const betweenCurrent = distance(currTarget, shooter);
      const betweenNext = distance(t, shooter);
      if (betweenNext < betweenCurrent) {
        currTarget = t;
      }
    });
    target = currTarget;
  }

  bullets.forEach((b) => {
    targets.forEach((t) => {
      if (hit(b, t)) {
        t.dead = true;
      }
    });
  });

  renderGrid(
    ctx,
    Math.floor(WIDTH / CELLSIZE) + 1,
    Math.floor(WIDTH / CELLSIZE) + 1,
    CELLSIZE,
    CELLSIZE
  );
  // target.render(ctx);
  shooter.render(ctx);
  renderBullets(ctx);
  renderTargets(ctx);

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
