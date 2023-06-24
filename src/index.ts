import KeyControls from "./KeyControls";
import { renderGrid } from "./DebugGrid";
import { CELLSIZE, HEIGHT, MAX_FRAME, SPEED, WIDTH } from "./constants";
import { clamp, distance } from "./utils";
import TileSprite from "./TileSprite";
import { renderRect, renderTileSprite } from "./renderers";
import Rect from "./Rect";
import Spider from "./Spider";

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

const spider = new Spider(controls);
spider.frame = { x: 0, y: 3};

const dungeonImage = new Image();
dungeonImage.src = 'dungeon.png';
const dungeonSprite = new TileSprite(dungeonImage, 64, 64);

function loop(ellapsedTime: number) {
  requestAnimationFrame(loop);

  dt = Math.min((ellapsedTime - time) * 0.001, MAX_FRAME);
  time = ellapsedTime;

  ctx.clearRect(0, 0, w, h);
  spider.update(dt, time * 0.001);

  renderTileSprite(dungeonSprite,ctx);

  // renderTileSprite(spider, ctx);

  // renderGrid(h / cellSize, w / cellSize, cellSize, cellSize);
}

requestAnimationFrame(loop);
