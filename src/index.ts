import drawDebugGrid from "./DebugGrid";
import KeyControls from "./KeyControls";
import { CELLSIZE, HEIGHT, SPEED, WIDTH } from "./constants";
const speed = SPEED;
const w = WIDTH;
const h = HEIGHT;
const controls = new KeyControls();
let dt = 0;
let time = 0;
const canvas = document.createElement("canvas") as HTMLCanvasElement;
document.body.appendChild(canvas);
canvas.width = w;
canvas.height = h;
canvas.style.margin = '32px';
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;


function loop(ellapsedTime: number) {
  requestAnimationFrame(loop);

  dt = (ellapsedTime - time) * 0.001;
  time = ellapsedTime;

  ctx.clearRect(0, 0, w, h);


  drawDebugGrid(ctx, HEIGHT / CELLSIZE, WIDTH / CELLSIZE, CELLSIZE);


}

requestAnimationFrame(loop);
