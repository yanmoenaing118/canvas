import KeyControls from "./KeyControls";
import { renderGrid } from "./DebugGrid";
import { CELLSIZE, HEIGHT, MAX_FRAME, SPEED, WIDTH } from "./constants";
import { clamp, distance } from "./utils";
import { renderRect, renderTileMap, renderTileSprite } from "./renderers";
import Rect from "./Rect";
import Spider from "./Spider";
import Dungeon from "./Dungeon";
import Vec2 from "./Vec2";

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
const rect = new Rect();
rect.w = spider.w;
rect.h = spider.h;
rect.style = {
  fill: 'white'
}
const dungeon = new Dungeon();

function loop(ellapsedTime: number) {
  requestAnimationFrame(loop);

  dt = Math.min((ellapsedTime - time) * 0.001, MAX_FRAME);
  time = ellapsedTime;

  ctx.clearRect(0, 0, w, h);

  const spiderMapPos = dungeon.pixelToMapPosition(spider.pos);
  const spiderPosPixel = dungeon.mapToPixelPosition(spiderMapPos);
  const tileAtSpiderPositon = dungeon.tileAtPixelPosition(spider.pos);

  console.log(`map: `, spiderMapPos.x, spiderMapPos.y);
  console.log(`pix: `, spiderPosPixel.x, spiderPosPixel.y)
  console.log(tileAtSpiderPositon === dungeon.chldren[15]);

  spider.update(dt, time * 0.001);
  rect.pos = {...spider.pos}

  renderTileMap(dungeon, ctx);
  renderRect(rect,ctx)
  renderTileSprite(spider,ctx);

  renderGrid(h / cellSize, w / cellSize, cellSize, cellSize);
}

requestAnimationFrame(loop);
