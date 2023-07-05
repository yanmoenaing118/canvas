import KeyControls from "./KeyControls";
import { renderGrid } from "./DebugGrid";
import { CELLSIZE, HEIGHT, MAX_FRAME, SPEED, WIDTH, WORLD_H, WORLD_W } from "./constants";
import { clamp, distance } from "./utils";
import { renderCamera, renderRect, renderTileMap, renderTileSprite } from "./Renderers";
import Rect from "./Rect";
import Spider from "./Spider";
import Dungeon from "./Dungeon";
import Vec2 from "./Vec2";
import Camera from "./Camera";
import Entity from "./Entity";

const canvas = document.createElement("canvas") as HTMLCanvasElement;
document.body.appendChild(canvas);

const w = WIDTH;
const h = HEIGHT;
let cellSize = CELLSIZE;

canvas.width = w;
canvas.height = h;
const controls = new KeyControls();
export const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
let dt = 1 / 60;
let time = 0;

const rect = new Rect();

rect.update = (dt) => {
  rect.pos.x += dt * rect.w;
  rect.pos.y += dt * rect.h;
};

function loop(ellapsedTime: number) {
  requestAnimationFrame(loop);

  dt = Math.min((ellapsedTime - time) * 0.001, MAX_FRAME);
  time = ellapsedTime;

  // updates
  cellSize += dt * 10;

  // rendering
  ctx.clearRect(0, 0, w, h);

  ctx.fillStyle = "red";

  // ctx.beginPath();

  ctx.beginPath();
  ctx.moveTo(cellSize, cellSize);
  ctx.lineTo(cellSize * 2, cellSize);
  ctx.lineTo(cellSize * 2, cellSize * 2);
  ctx.lineTo(cellSize, cellSize * 2);
  ctx.lineTo(cellSize, cellSize);
  ctx.fill();
  ctx.stroke();


  // renderGrid(h / cellSize, w / cellSize, cellSize, cellSize);
}

requestAnimationFrame(loop);
