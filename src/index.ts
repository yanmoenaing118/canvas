import Camera from "./Camera";
import { renderGrid } from "./DebugGrid";
import KeyControls from "./KeyControls";
import Level from "./Level";
import Player from "./Player";
import Renderer from "./Renderer";
import { CELLSIZE, HEIGHT, WIDTH, WORLD_H, WORLD_W } from "./constants";
import { clamp } from "./utils";

const controls = new KeyControls();
const { ctx } = new Renderer(WIDTH, HEIGHT);
let dt = 0;
let time = 0;

const worldSize = {
  w: WORLD_W,
  h: WORLD_H,
};
const map = new Level(worldSize.w, worldSize.h);
const camera = new Camera(WIDTH * 0.5, HEIGHT * 0.5, worldSize);
const player = new Player(controls);


camera.update = (dt: number, t: number) => {
  const cameraOffsetX = clamp(player.pos.x - camera.w / 2 , 0, camera.maxX);
  const cameraOffsetY = clamp(player.pos.y - camera.h / 2, 0, camera.maxY);

  camera.pos.x = cameraOffsetX;
  camera.pos.y = cameraOffsetY;

  map.pos.x = -cameraOffsetX;
  map.pos.y = -cameraOffsetY;

  // console.log(JSON.stringify(map.pos));
};

function loop(ellapsedTime: number) {
  requestAnimationFrame(loop);
  dt = (ellapsedTime - time) * 0.001;
  time = ellapsedTime;

  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  camera.update(dt, time * 0.001);
  player.update(dt, time * 0.001);

  map.render(ctx);
  camera.render(ctx);
  player.render(ctx);

  // renderGrid(
  //   ctx,
  //   HEIGHT / CELLSIZE + 1,
  //   WIDTH / CELLSIZE + 1,
  //   CELLSIZE,
  //   CELLSIZE,
  //   "white"
  // );
}

requestAnimationFrame(loop);
