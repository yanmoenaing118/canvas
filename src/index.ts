import Camera from "./Camera";
import Container from "./Container";
import drawDebugGrid from "./DebugGrid";
import Entity from "./Entity";
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
  h: h + h * 0.25
}

const renderer = new Renderer(w, h);
const { ctx } = renderer;


const bgTexture = new Texture('bg.jpeg');
bgTexture.w = worldSize.w;
bgTexture.h = worldSize.h;
const scene = new Container(0, 0, worldSize.w, worldSize.h);
const player = new Texture('logo.ico');
player.w = CELLSIZE;
player.h = CELLSIZE;
const camera = new Camera(0, 0, w, h, worldSize, player);

const player2 = new Player(0,0,CELLSIZE,CELLSIZE);
player2.shape = 'rect';
player2.pos.x = w / 2 - player2.w * 0.5;
player2.pos.y = h / 2 - player2.h * 0.5;

// debugger rect for Camera
const cameraRect = new Entity(camera.pos.x, camera.pos.y, camera.w, camera.h);
cameraRect.shape = 'rect';
cameraRect.style.fillStyle = 'rgba(0,0,0,0.3)';

// player.shape = "rect";
player.style.fillStyle = "darkgreen";
player.pos.x = camera.pos.x + camera.w / 2 - CELLSIZE / 2;
player.pos.y = camera.pos.y + camera.h / 2 - CELLSIZE / 2;



camera.add(bgTexture);
camera.add(player2);
camera.add(player);


scene.add(camera);
scene.add(cameraRect);

function loop(ellapsedTime: number) {
  requestAnimationFrame(loop);

  dt = (ellapsedTime - time) * 0.001;
  time = ellapsedTime;

  ctx.clearRect(0, 0, w, h);




  // UPDATE operations start

  player.pos.x += dt * controls.x * SPEED;
  player.pos.y += dt * controls.y * SPEED;


  camera.update();

  cameraRect.pos.x = camera.pos.x;
  cameraRect.pos.y = camera.pos.y;

  // UPDATE operations end



  // update
  player.pos.x =clamp(player.pos.x,0,worldSize.w - player.w);
  player.pos.y = clamp(player.pos.y, 0, worldSize.h - player.h);






  // renders and  grid debugger
  renderer.render(scene);
  drawDebugGrid(ctx, HEIGHT / CELLSIZE, WIDTH / CELLSIZE, CELLSIZE);

}

requestAnimationFrame(loop);
