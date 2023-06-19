import KeyControls from "./KeyControls";
import { renderGrid } from "./DebugGrid";
import { CELLSIZE, HEIGHT, MAX_FRAME, SPEED, WIDTH } from "./constants";
import { clamp, distance } from "./utils";
import Rect from "./Rect";
import { renderImg, renderRect } from "./renderers";
import Sprite from "./Sprite";

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
rect.style.fill = "pink";
const rect2 = new Rect();
rect2.style.fill = "red";
rect2.w = CELLSIZE;
rect2.h = CELLSIZE;
rect2.center(w, h);

function updateRect(dt: number) {
return
  rect.pos.x += controls.x * SPEED * dt;
  rect.pos.y += controls.y * SPEED * dt;
}

const img = new Image();
img.src = "logo.ico";
const love = new Sprite(img, CELLSIZE, CELLSIZE);

function updateSprite(dt: number) {
  love.pos.x = CELLSIZE;
  love.scale.x = controls.x == 0 ? 1 : controls.x;

  if(love.scale.x == -1) {
    love.anchor = {
      x: -cellSize/2,
      y: -cellSize/2
    }
  } else {
    love.anchor = {
      x: 0,
      y: 0
    }
  }
}

function loop(ellapsedTime: number) {
  requestAnimationFrame(loop);

  dt = Math.min((ellapsedTime - time) * 0.001, MAX_FRAME);
  time = ellapsedTime;
  ctx.clearRect(0, 0, w, h);
  ctx.globalAlpha = 0.6;

  updateRect(dt);
  updateSprite(dt);

  renderRect(rect, ctx);
  renderRect(rect2, ctx);
  renderImg(love, ctx);

  const dis = Math.round(distance(rect, rect2));
  console.log(dis);
  if (dis <= CELLSIZE) {
    console.log("collide");
  }

  renderGrid(h / cellSize, w / cellSize, cellSize, cellSize);
}

requestAnimationFrame(loop);
