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
const camera = new Camera(w,h,w,h);



const dungeon = camera.add(new Dungeon(w,h));

const rect = camera.add(new Rect());
rect.pos.x = CELLSIZE;
rect.pos.y = CELLSIZE;
rect.style = {
  fill: 'red'
}
rect.update = (dt) => {

  const rMap = dungeon.pixelToMapPosition(rect.pos)
  // console.log(rMap);

  const topTile = dungeon.tileAtMapPosition({
    x: rMap.x,
    y: rMap.y - 1
  })
  const bottomTile = dungeon.tileAtMapPosition({
    x: rMap.x,
    y: rMap.y + 1
  })
  const leftTile = dungeon.tileAtMapPosition({
    x: rMap.x -1,
    y: rMap.y
  })
  const rightTile = dungeon.tileAtMapPosition({
    x: rMap.x + 1,
    y: rMap.y
  })

  // console.log(`top:  ${topTile.frame.meta?.walkable}`)
  // console.log(`bottom: ${bottomTile.frame.meta?.walkable}`)


  rect.pos.x += dt * 320 * controls.x;
  rect.pos.y += dt * 320 * controls.y;
};


function loop(ellapsedTime: number) {
  requestAnimationFrame(loop);

  dt = Math.min((ellapsedTime - time) * 0.001, MAX_FRAME);
  time = ellapsedTime;

  // updates


  // rendering
  ctx.clearRect(0, 0, w, h);

  ctx.fillStyle = "red";



  rect.update(dt,time);



  renderCamera(camera,ctx);
  renderGrid(h / cellSize, w / cellSize, cellSize, cellSize, 'white');
}

requestAnimationFrame(loop);
