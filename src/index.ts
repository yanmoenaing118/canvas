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

const circle = new Circle({ x: 32, y: 16 }, 32, { fill: 'pink'});



circle.update = (dt: number, t: number)=> {
    circle.pos.y += dt * circle.speed;
    circle.pos.y = clamp(circle.pos.y, 0, HEIGHT - circle.r)
}


function loop(ellapsedTime: number) {
  dt = Math.min(MAX_DELTA, (ellapsedTime - t) * 0.001);
  t = ellapsedTime;

  circle.update(dt, t);

  ctx.clearRect(0, 0, WIDTH , HEIGHT );

  renderGrid(ctx, HEIGHT / CELLSIZE, WIDTH / CELLSIZE, CELLSIZE, CELLSIZE);



  circle.render(ctx);

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
