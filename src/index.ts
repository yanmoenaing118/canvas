import { renderGrid } from "./DebugGrid";
import KeyControls from "./KeyControls";
import RotatedObject from "./RotatedObject";

import { CELLSIZE, HEIGHT, MAX_DELTA, WIDTH } from "./constants";
import { clamp } from "./utils";

const canvas = document.createElement("canvas") as HTMLCanvasElement;
export const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
document.body.appendChild(canvas);
// canvas.style.margin = "30px";
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

const r = new RotatedObject();
let scale = 1;

r.pos.x = CELLSIZE * 4;
r.pos.y = CELLSIZE * 3;
let x = 0;
let y = 0;

canvas.addEventListener("mousemove", (e) => {
  x = e.pageX;
  y = e.pageY;
  console.log(x, y);
});

canvas.addEventListener("wheel", (e) => {
  // if (e.deltaX > 0) return;
  scale += e.deltaY * -0.005;
  scale = clamp(scale, 1, 3);
});

requestAnimationFrame(loop);

function loop(ellapsedTime: number) {
  dt = Math.min(MAX_DELTA, (ellapsedTime - t) * 0.001);
  t = ellapsedTime;

  ctx.clearRect(0, 0, WIDTH + CELLSIZE, HEIGHT + CELLSIZE);

  r.update(dt, t);

  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  ctx.save();
  ctx.translate(-x, -y);

  r.render(ctx);
  renderGrid(ctx, HEIGHT / CELLSIZE, WIDTH / CELLSIZE, CELLSIZE, CELLSIZE);

  ctx.restore();
  ctx.restore();

  requestAnimationFrame(loop);
}
