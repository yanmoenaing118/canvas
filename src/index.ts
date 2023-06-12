import KeyControls from "./KeyControls";
import { clamp } from "./helpers";

const SPEED = 320;
const MAX_FRAME = 1 / 60;
const w = 640;
const h = 480;
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
  offset: { x: 0, y: 0}
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


const renderWorld = () => {
  ctx.save();
  ctx.fillStyle = 'red';
  ctx.translate(world.pos.x,world.pos.y);
  ctx.fillRect(0,0, world.w, world.h);
  ctx.restore();

  ctx.save();
  ctx.fillStyle = 'pink';
  ctx.translate(camera.pos.x,camera.pos.y);
  ctx.fillRect(0,0,world.w,wallSize);
  ctx.restore();

  ctx.save();
  ctx.fillStyle = 'green';
  ctx.translate(camera.pos.x,camera.pos.y);
  ctx.fillRect(0,0,wallSize,world.h);
  ctx.restore();

  ctx.save();
  ctx.fillStyle = 'blue';
  ctx.translate(camera.pos.x + world.w - wallSize, 0);
  ctx.fillRect(0,0,wallSize, world.h);
  ctx.restore();

  ctx.save();
  ctx.fillStyle = 'gold';
  ctx.translate(0,camera.pos.y + world.h - wallSize);
  ctx.fillRect(0,0,world.w, wallSize);
  ctx.restore();

}

const renderPlayer = () => {
  ctx.save();
  ctx.fillStyle = 'purple';
  ctx.translate(player.pos.x, player.pos.y);
  ctx.fillRect(0,0,wallSize,wallSize);
  ctx.restore();

}


const updatePlayer = () => {
  player.pos.x += controls.x * dt * SPEED;
  player.pos.y += controls.y * dt * SPEED;

  player.pos.x = clamp(player.pos.x, playerBounds.left, playerBounds.right);
  player.pos.y = clamp(player.pos.y, playerBounds.top, playerBounds.bottom);
}

const updateCamera = () => {
  camera.offset.x = w - player.pos.x;
  camera.offset.y = h - player.pos.y;

  camera.pos.x = player.pos.x - camera.offset.x;
  camera.pos.y = player.pos.y - camera.offset.y;
  
  
  camera.pos.x = -clamp(camera.pos.x, 0, world.w  - w);
  camera.pos.y = -clamp(camera.pos.y, 0, world.h - h );
}

const renderCamera = () => {
  ctx.save();
  ctx.translate(camera.pos.x,camera.pos.y);
  ctx.restore();
}


const loop = (ellapsedTime: number) => {
  dt = Math.min(MAX_FRAME, (ellapsedTime - time) * 0.001);
  time = ellapsedTime;

  ctx.clearRect(0,0,w,h);

  ctx.globalAlpha = 0.5;

  updateCamera();
  updatePlayer();
  updateCamera();

  if(player.pos.x >= world.w) {
    console.log(player.pos);
  }

  console.log('player: ',player.pos.x, player.pos.y);
  console.log('world: ',world.pos.x, world.pos.y);
  console.log('camera: ', camera.pos.x, camera.pos.y);
  renderWorld();
  renderPlayer();
  renderCamera();

  requestAnimationFrame(loop);
};

requestAnimationFrame(loop);
