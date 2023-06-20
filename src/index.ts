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


const rect2 = new Rect();
rect2.style.fill = "red";
rect2.w = CELLSIZE * 2;
rect2.h = CELLSIZE * 2;
rect2.center(w, h);

function updateRect(dt: number) {

}

const img = new Image();
img.src = "logo.ico";
const love = new Sprite(img, CELLSIZE * 2, CELLSIZE * 2);
love.center(w,h);

function updateSprite(dt: number) {
    const isFlip = controls.x == -1;
    if(isFlip) {
      console.log(love.pos);
      love.anchor = { x: love.w, y: 0 }
      love.scale.x = controls.x;
    } else if(love.scale.x == -1 && controls.x == 1) {
      love.anchor = { x: 0, y: 0};
      love.scale.x = 1;
      console.log('hi')
    }

    console.log(love.anchor, love.scale);

   love.pos.x += dt * 100 * controls.x;
}

function loop(ellapsedTime: number) {
  requestAnimationFrame(loop);

  dt = Math.min((ellapsedTime - time) * 0.001, MAX_FRAME);
  time = ellapsedTime;
  ctx.clearRect(0, 0, w, h);
  ctx.globalAlpha = 0.6;

  updateRect(dt);
  updateSprite(dt);

  renderRect(rect2, ctx);
  renderImg(love, ctx);


  renderGrid(h / cellSize, w / cellSize, cellSize, cellSize);
}

requestAnimationFrame(loop);
