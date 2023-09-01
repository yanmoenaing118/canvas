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

const gravity = 9.8;

const circles: Circle[] = new Array(2).fill(10).map((_) => {
  const circle = new Circle(
    { x: Math.random() * WIDTH, y: Math.random() * 64 },
    32,
    { fill: "pink" }
  );

  circle.update = (dt: number, t: number) => {
    if (circle.pos.y >= HEIGHT - circle.r) {
      circle.vel.y = 0;
      circle.jumping = false;
      // circle.vel.y = -400 + gravity;
    } else {
      circle.vel.y += gravity;
      circle.jumping = true;
    }
    if (controls.action && !circle.jumping) {
      circle.vel.y = -((Math.random() * 300) + 400);
      // circle.jumping = true;
    }
    if (controls.x) {
      circle.pos.x += circle.vel.x * dt * controls.x;
    }
    circle.pos.y += circle.vel.y * dt;
    circle.pos.y = clamp(circle.pos.y, 0, HEIGHT - circle.r);
  };
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
