import KeyControls from "./KeyControls";
import { renderGrid } from "./DebugGrid";
import {
  CELLSIZE,
  HEIGHT,
  MAX_FRAME,
  SPEED,
  WIDTH,
  WORLD_H,
  WORLD_W,
} from "./constants";
import { clamp, distance } from "./utils";
import {
  renderCamera,
  renderRect,
  renderTileMap,
  renderTileSprite,
} from "./Renderers";
import Rect from "./Rect";
import Spider from "./Spider";
import Dungeon from "./Dungeon";
import Vec2 from "./Vec2";
import Camera from "./Camera";
import Entity from "./Entity";
import Player from "./Player";
import Text from "./Text";

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
const camera = new Camera(w, h, w, h);

const dungeon = camera.add(new Dungeon(w, h));

const rect = camera.add(new Player(controls, dungeon));
rect.pos.x = CELLSIZE;
rect.pos.y = CELLSIZE;
const speed = 320;
rect.style = {
  fill: "rgba(255,0,0,0.5)",
};

const text = camera.add(
  new Text("", {
    fill: "white",
  })
);

text.pos.x = 20;
text.pos.y = 30;
function loop(ellapsedTime: number) {
  requestAnimationFrame(loop);

  dt = Math.min((ellapsedTime - time) * 0.001, MAX_FRAME);
  time = ellapsedTime;

  const rectMapPos = dungeon.pixelToMapPosition(rect.pos);

  // updates
  text.text = `pixel: (${rect.pos.x.toFixed(2)}, ${rect.pos.y.toFixed(
    2
  )}) | map: (${rectMapPos.x}, ${rectMapPos.y})
  `;

  rect.update(dt, time);

  // rendering
  ctx.clearRect(0, 0, w, h);

  ctx.fillStyle = "red";




  renderCamera(camera, ctx);
  renderGrid(h / cellSize, w / cellSize, cellSize, cellSize, "white");
}

requestAnimationFrame(loop);
