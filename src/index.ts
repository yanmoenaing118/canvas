import KeyControls from "./KeyControls";
import Wall from "./Walls";
import { clamp } from "./helpers";

const SPEED = 320;
const MAX_FRAME = 1 / 60;
const w = 480;
const h = 320;
const controls = new KeyControls();

const canvas = document.createElement("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

document.body.appendChild(canvas);

canvas.width = w;
canvas.height = h;

let dt = MAX_FRAME;
let time = 0;

const wallSize = 32;

let world = {
  pos: { x: 0, y: 0 },
  w: w * 2,
  h: h * 2,
};

let camera = {
  pos: { x: 0, y: 0 },
  w: w,
  h: h,
  offset: { x: 0, y: 0 },
};

let player = {
  pos: { x: 0, y: 0 },
  w: 32,
  h: 32,
};

let playerBounds = {
  left: wallSize,
  right: camera.w - wallSize,
  top: wallSize,
  bottom: camera.h - wallSize,
};

// top / right / bottom / left

const walls = new Wall(world.w, world.h, wallSize);

const loop = (ellapsedTime: number) => {
  requestAnimationFrame(loop);
  dt = Math.min(MAX_FRAME, (ellapsedTime - time) * 0.001);
  time = ellapsedTime;

  ctx.clearRect(0, 0, w, h);
  ctx.strokeStyle = "black";
  ctx.strokeRect(0, 0, w, h);

  walls.render(ctx);
};

requestAnimationFrame(loop);
