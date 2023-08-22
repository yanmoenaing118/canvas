import { renderGrid } from "./DebugGrid";
import KeyControls from "./KeyControls";
import RotatedObject from "./RotatedObject";

import { CELLSIZE, HEIGHT, MAX_DELTA, WIDTH } from "./constants";
import { clamp } from "./utils";
const container = document.createElement("div");
const canvasWrapper = document.createElement("div");

container.classList.add("container");
document.body.appendChild(container);
container.appendChild(canvasWrapper);

const canvas = document.createElement("canvas") as HTMLCanvasElement;
export const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
canvasWrapper.appendChild(canvas);
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

const rotated = new RotatedObject();
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


let wrapperWidth = WIDTH;
canvas.addEventListener("wheel", (e) => {
  e.preventDefault();
  // if (e.deltaX > 0) return;
  scale += e.deltaY * -0.005;
  scale = clamp(scale, 1, 3);


  wrapperWidth += scale;

  canvas.style.width = `${wrapperWidth}px`;


  // canvasWrapper.style.width = `${wrapperWidth}px`;
});

requestAnimationFrame(loop);

function loop(ellapsedTime: number) {
  dt = Math.min(MAX_DELTA, (ellapsedTime - t) * 0.001);
  t = ellapsedTime;

  ctx.clearRect(0, 0, WIDTH + CELLSIZE, HEIGHT + CELLSIZE);

  rotated.update(dt, t);
  r.update(dt, t);

  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, 1);

  ctx.save();
  ctx.translate(-x, -y);
  
  console.log(Math.floor(parseInt(canvas.style.width) / CELLSIZE))
  
  rotated.render(ctx);
  r.render(ctx);
  renderGrid(ctx, Math.floor(parseInt(canvas.style.width) / CELLSIZE), 3, CELLSIZE, CELLSIZE);

  ctx.restore();
  ctx.restore();




  requestAnimationFrame(loop);
}
