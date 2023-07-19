import { CELLSIZE, HEIGHT, MAX_DELTA, WIDTH } from "./constants";
import { renderGrid } from "./DebugGrid";
import KeyControls from "./KeyControls";
import Level from "./Level";
import Player from "./Player";
const canvas = document.createElement("canvas") as HTMLCanvasElement;
export const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
document.body.appendChild(canvas);

canvas.width = WIDTH;
canvas.height = HEIGHT;

let dt = 0;
let t = 0;

const controls = new KeyControls();

const map = new Level();
const player = new Player(controls, map);

const loop = (ellapsedTime: number) => {
  requestAnimationFrame(loop);
  dt = Math.min((ellapsedTime - t) * 0.001, MAX_DELTA);
  t = ellapsedTime;



  player.update(dt, t * 0.001);


  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  map.render();
  player.render();
  renderGrid(
    ctx,
    HEIGHT / CELLSIZE,
    WIDTH / CELLSIZE,
    CELLSIZE,
    CELLSIZE,
    "white"
  );
};

requestAnimationFrame(loop);
