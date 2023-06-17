import Camera from "./Camera";
import Container from "./Container";
import drawDebugGrid from "./DebugGrid";
import KeyControls from "./KeyControls";
import Player from "./Player";
import Renderer from "./Renderer";
import Texture from "./Texture";
import { CELLSIZE, HEIGHT, SPEED, WIDTH, controls } from "./constants";
import { clamp } from "./helpers";
const speed = SPEED;
const w = WIDTH;
const h = HEIGHT;
let dt = 0;
let time = 0;

const worldSize = {
  w: w + w * 0.5,
  h: h + 64
}

const renderer = new Renderer(w, h);
const { ctx } = renderer;


const bgTexture = new Texture('bg.jpeg');
bgTexture.w = worldSize.w;
bgTexture.h = worldSize.h;
const scene = new Container(0, 0, worldSize.w, worldSize.h);
const player = new Player(0, 0, CELLSIZE, CELLSIZE);
const player2 = new Player(0, 0, CELLSIZE, CELLSIZE);
const camera = new Camera(0, 0, w, h, worldSize, player);




player.shape = "rect";
player.style.fillStyle = "darkgreen";
player.pos.x = camera.pos.x + camera.w / 2 - CELLSIZE / 2;
player.pos.y = camera.pos.y + camera.h / 2 - CELLSIZE / 2;


camera.add(bgTexture);
camera.add(player);
camera.add(player2);
scene.add(camera);

function loop(ellapsedTime: number) {
  requestAnimationFrame(loop);

  dt = (ellapsedTime - time) * 0.001;
  time = ellapsedTime;

  ctx.clearRect(0, 0, w, h);
  ctx.globalAlpha = 0.5;



  player.pos.x += dt * controls.x * SPEED;
  player.pos.y += dt * controls.y * SPEED;


  player.pos.x =clamp(player.pos.x,0,worldSize.w - player.w);
  player.pos.y = clamp(player.pos.y, 0, worldSize.h - player.h);
  camera.update();





  // grid debugger
  drawDebugGrid(ctx, HEIGHT / CELLSIZE, WIDTH / CELLSIZE, CELLSIZE);
  renderer.render(scene);
}

requestAnimationFrame(loop);
