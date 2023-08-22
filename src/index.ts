import Circle from "./Circle";
import { renderGrid } from "./DebugGrid";
import KeyControls from "./KeyControls";
import RotatedObject from "./RotatedObject";
import State from "./State";

import { CELLSIZE, HEIGHT, MAX_DELTA, WIDTH } from "./constants";
import { clamp } from "./utils";

const canvas = document.createElement("canvas") as HTMLCanvasElement;
export const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
document.body.appendChild(canvas);
canvas.style.boxShadow = "0 0 3px rgba(0,0,0,0.3)";
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
const controls = new KeyControls();
const circle = new Circle({ x: 32, y: 32 }, 32, { fill: "pink" });
const c2 = new Circle({ x: CELLSIZE * 3, y: 32 }, 32, { fill: "pink" });

const gravity = 32;

circle.update = (dt: number, t: number) => {
  if (!circle.state.is("jumping") && controls.action) {
    circle.vel.y = -100;
    circle.state.set("jumping");
  }

  if (circle.pos.y == HEIGHT - circle.r) {
    circle.vel.y = 0;
    circle.state.set("idle");
  }

  circle.vel.y += gravity * dt;
  circle.pos.y += circle.vel.y;

  circle.pos.x += dt * controls.x * circle.speed;
  circle.pos.y = clamp(circle.pos.y, 0, HEIGHT - circle.r);
  console.log(circle.vel.y);
};

c2.update = (dt: number, t: number) => {
  c2.pos.y += dt * circle.speed;
  c2.pos.y = clamp(c2.pos.y, 0, HEIGHT - c2.r);
};

function loop(ellapsedTime: number) {
  dt = Math.min(MAX_DELTA, (ellapsedTime - t) * 0.001);
  t = ellapsedTime;

  circle.update(dt, t);
  c2.update(dt, t);

  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  renderGrid(ctx, HEIGHT / CELLSIZE, WIDTH / CELLSIZE, CELLSIZE, CELLSIZE);

  circle.render(ctx);
  c2.render(ctx);

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
