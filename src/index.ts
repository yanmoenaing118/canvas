import Camera from "./Camera";
import { renderGrid } from "./DebugGrid";
import KeyControls from "./KeyControls";
import Level from "./Level";
import Player from "./Player";
import Renderer from "./Renderer";
import Title from "./Title";
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
const camera = new Camera(WIDTH * 1, HEIGHT * 1, worldSize);
const player = new Player(controls);
const title = new Title("Camera movement".toUpperCase(), {
  font: "28px Monospace",
  fill: "black",
  stroke: "black",
});
title.pos.x = 50;
title.pos.y = 40;

camera.update = (dt: number, t: number) => {
  const cameraOffsetX = clamp(player.pos.x - camera.w / 2, 0, camera.maxX);
  const cameraOffsetY = clamp(player.pos.y - camera.h / 2, 0, camera.maxY);

  camera.pos.x = -cameraOffsetX;
  camera.pos.y = -cameraOffsetY;

  // map.pos.x = -cameraOffsetX;
  // map.pos.y = -cameraOffsetY;

  // console.log(JSON.stringify(map.pos));
};

function loop(ellapsedTime: number) {
  requestAnimationFrame(loop);
  dt = (ellapsedTime - time) * 0.001;
  time = ellapsedTime;

  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  camera.update(dt, time * 0.001);
  player.update(dt, time * 0.001);

  /**
   * Every entity need to be inside the Camera render cycle
   */

  ctx.save();
  ctx.translate(camera.pos.x, camera.pos.y);
  map.render(ctx);
  player.render(ctx);
  ctx.restore();

  title.render(ctx);
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
