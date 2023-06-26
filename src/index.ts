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
  fill: 'white',
  stroke: 'black'
}
const dungeon = new Dungeon(WORLD_W, WORLD_H);

const camera = new Camera(w,h, WORLD_W, WORLD_H);

// camera.add(dungeon as Entity);
// camera.add(rect)
camera.add(spider as Entity);

camera.setEntity(spider as Entity);


// console.log(camera)
function loop(ellapsedTime: number) {
  requestAnimationFrame(loop);

  dt = Math.min((ellapsedTime - time) * 0.001, MAX_FRAME);
  time = ellapsedTime;

  ctx.clearRect(0, 0, w, h);

  const spiderMapPos = dungeon.pixelToMapPosition(spider.pos);
  const spiderPosPixel = dungeon.mapToPixelPosition(spiderMapPos);
  const tileAtSpiderPositon = dungeon.tileAtPixelPosition(spider.pos);

  // console.log(`map: `, spiderMapPos.x, spiderMapPos.y);
  // console.log(`pix: `, spiderPosPixel.x, spiderPosPixel.y)
  
  // if(tileAtSpiderPositon === dungeon.chldren[12]) {
  //   console.log('12', tileAtSpiderPositon);
  // } 

  // if(tileAtSpiderPositon === dungeon.chldren[11]) {
  //   console.log('11', tileAtSpiderPositon)
  // }

  rect.pos = {...spider.pos}
  
  // console.log(camera.pos)
  
  spider.update(dt, time * 0.001);
  camera.update(dt, time * 0.001);
  renderCamera(camera, ctx);

  // renderTileMap(dungeon, ctx);
  // renderTileSprite(spider,ctx);

  renderGrid(h / cellSize, w / cellSize, cellSize, cellSize);
}

requestAnimationFrame(loop);
