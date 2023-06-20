import KeyControls from "./KeyControls";
import { renderGrid } from "./DebugGrid";
import { CELLSIZE, HEIGHT, MAX_FRAME, SPEED, WIDTH } from "./constants";
import { clamp, distance } from "./utils";
import TileSprite from "./TileSprite";
import { renderRect, renderTileSprite } from "./renderers";
import Rect from "./Rect";


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

const img  = new Image();
img.src = 'wall.png';

const tileSprite = new TileSprite(img, w, cellSize);

tileSprite.frame = { 
  x: 0,
  y: 0
}
tileSprite.pos.y = cellSize * 7
let framRate = 1;
let lastFrameUpdate = 0;

const rect = new Rect();
rect.w = tileSprite.tileW;
rect.h = tileSprite.tileH;
rect.style.fill = 'pink';
function loop(ellapsedTime: number) {
  requestAnimationFrame(loop);

  dt = Math.min((ellapsedTime - time) * 0.001, MAX_FRAME);
  time = ellapsedTime;

  // if((lastFrameUpdate = lastFrameUpdate + dt) >= framRate) {
  //   tileSprite.frame.x = Math.fround(ellapsedTime) % Math.round(w / cellSize);
  //   lastFrameUpdate = 0;
  // } 

  ctx.clearRect(0, 0, w, h);
  ctx.globalAlpha = 0.6;


  renderRect(rect,ctx);
  renderTileSprite(tileSprite, ctx);

  renderGrid(h / cellSize, w / cellSize, cellSize, cellSize);
}

requestAnimationFrame(loop);
