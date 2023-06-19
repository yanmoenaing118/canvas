import { KeyControls } from "./KeyControls";
import { renderGrid } from "./DebugGrid";
import { CELLSIZE, HEIGHT, MAX_FRAME, WIDTH } from "./constants";
import { clamp } from "./utils";
import Rect from "./Rect";
import { renderRect } from "./renderers";

const canvas = document.createElement("canvas") as HTMLCanvasElement;
document.body.appendChild(canvas);

const w = WIDTH;
const h = HEIGHT;
const cellSize = CELLSIZE;

canvas.width = w;
canvas.height = h;
const controls = new KeyControls();
export const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
let dt = 1 / 60;
let time = 0;


const rect = new Rect();
rect.style.fill = 'pink';

const rect2 = new Rect();
rect2.style.fill = 'red';
rect2.pos.x = CELLSIZE;

function loop(ellapsedTime: number) {
  requestAnimationFrame(loop);


  dt = Math.min((ellapsedTime - time) * 0.001, MAX_FRAME);
  time = ellapsedTime;
  ctx.clearRect(0, 0, w, h);

  renderRect(rect, ctx);
  renderRect(rect2, ctx);

  renderGrid(h / cellSize, w / cellSize, cellSize, cellSize);
  
}

requestAnimationFrame(loop);
