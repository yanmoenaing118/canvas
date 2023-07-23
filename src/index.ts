import Camera from "./Camera";
import { renderGrid } from "./DebugGrid";
import KeyControls from "./KeyControls";
import Level from "./Level";
import Renderer from "./Renderer";
import { CELLSIZE, HEIGHT, WIDTH } from "./constants";
import { clamp } from "./utils";

const controls = new KeyControls();
const { ctx } = new Renderer(WIDTH, HEIGHT);
let dt = 0;
let time = 0;

const worldSize = WIDTH + WIDTH;
const map = new Level(worldSize, worldSize);
const camera = new Camera(WIDTH, WIDTH, worldSize);
const maxX = camera.worldSize - camera.w;
const maxY = camera.worldSize - camera.h;
console.log(camera);
console.log(maxY);
console.log(maxX);
camera.update = (dt: number, t: number) => {
  camera.pos.x += camera.speed * dt * controls.x;
  camera.pos.y += camera.speed * dt * controls.y;

  const cameraOffsetX = clamp(camera.pos.x, 0, maxX);
  const cameraOffsetY = clamp(camera.pos.y, 0, maxY);

  camera.pos.x = cameraOffsetX;
  camera.pos.y = cameraOffsetY;

  map.pos.x = -cameraOffsetX;
  map.pos.y = -cameraOffsetY;

  console.log(JSON.stringify(camera.pos));
};

function loop(ellapsedTime: number) {
  requestAnimationFrame(loop);
  dt = (ellapsedTime - time) * 0.001;
  time = ellapsedTime;

  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.fillRect(0, 0, worldSize, worldSize);

  camera.update(dt, time * 0.001);
  map.render(ctx);
  camera.render(ctx);

  renderGrid(
    ctx,
    HEIGHT / CELLSIZE + 1,
    WIDTH / CELLSIZE + 1,
    CELLSIZE,
    CELLSIZE,
    "black"
  );
}

requestAnimationFrame(loop);
