import Circle from "./Circle";
import { renderGrid } from "./DebugGrid";
import KeyControls from "./KeyControls";

import { CELLSIZE, HEIGHT, MAX_DELTA, WIDTH } from "./constants";
import setResolution from "./resolution";
import { clamp } from "./utils";

const canvas = document.createElement("canvas") as HTMLCanvasElement;
export const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
document.body.appendChild(canvas);
canvas.style.boxShadow = "0 0 3px rgba(0,0,0,0.3)";
setResolution(canvas, WIDTH, HEIGHT);

let dt = 0;
let t = 0;
const controls = new KeyControls();

const gravity = 32;
let vel = 0;

const circles: Circle[] = new Array(1).fill(10).map((_) => {
  const circle = new Circle(
    { x: Math.random() * WIDTH, y: HEIGHT - 32 },
    32,
    { fill: "pink" }
  );

  circle.update = (dt: number, t: number) => {

    const ox = controls.x * dt * 320;
    let oy = 0;

    if(!circle.jumping && controls.action) {
      circle.vel.y = -15;
      circle.jumping = true;
    }

    if(circle.jumping) {
      circle.vel.y += dt * gravity;
      oy += circle.vel.y;
    }

    if(circle.pos.y >= HEIGHT - 32) {
      circle.jumping = false;
      circle.pos.y = HEIGHT - 32;
    }

    circle.pos.x += ox;
    circle.pos.y += oy;

    circle.pos.x = clamp(circle.pos.x, circle.r, WIDTH - circle.r );
  }

  return circle;
});

const renderCircles = (ctx: CanvasRenderingContext2D) => {
  circles.forEach((c) => c.render(ctx));
};

const updateCircles = (dt: number, t: number) =>
  circles.forEach((c) => c.update(dt, t));

function loop(ellapsedTime: number) {
  dt = Math.min(MAX_DELTA, (ellapsedTime - t) * 0.001);
  t = ellapsedTime;

  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  updateCircles(dt, t * 0.001);

  renderGrid(ctx, HEIGHT / CELLSIZE, WIDTH / CELLSIZE, CELLSIZE, CELLSIZE);

  renderCircles(ctx);

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
