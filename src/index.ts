import Camera from "./Camera";
import Container from "./Container";
import drawDebugGrid from "./DebugGrid";
import Entity from "./Entity";
import Player from "./Player";
import Renderer from "./Renderer";
import Stats from "./Stats";
import Texture from "./Texture";
import { CELLSIZE, HEIGHT, SPEED, WIDTH, controls } from "./constants";
import { clamp } from "./helpers";
const speed = SPEED;
const w = WIDTH;
const h = HEIGHT;
let dt = 0;
let time = 0;


const renderer = new Renderer(w, h);

const worldSize = {
  w: renderer.canvas.width + renderer.canvas.width * 0.5,
  h: renderer.canvas.height + renderer.canvas.height * 0.75
}


const bgTexture = new Texture('bg.jpeg');
bgTexture.w = worldSize.w;
bgTexture.h = worldSize.h;
const scene = new Container(0, 0, worldSize.w, worldSize.h);
const player = new Texture('logo.ico');
player.w = CELLSIZE;
player.h = CELLSIZE;
const camera = new Camera(0, 0, w, h, worldSize, player);


// debugger rect for Camera
const cameraRect = new Entity(camera.pos.x, camera.pos.y, camera.w, camera.h);
cameraRect.shape = 'rect';
cameraRect.style.fillStyle = 'rgba(0,0,0,0.2)';

// player.shape = "rect";
player.style.fillStyle = "darkgreen";
player.pos.x = camera.pos.x + camera.w / 2 - CELLSIZE / 2;
player.pos.y = camera.pos.y + camera.h / 2 - CELLSIZE / 2;

const camStats = new Stats('')
camStats.pos.x =  4;
camStats.pos.y =  20;
const pStats = new Stats('')
pStats.pos.x =  4;
pStats.pos.y =  45;

camera.add(bgTexture);
camera.add(player);


scene.add(camera);
// scene.add(cameraRect);
scene.add(pStats);
scene.add(camStats)


function loop(ellapsedTime: number) {
  requestAnimationFrame(loop);

  dt = (ellapsedTime - time) * 0.001;
  time = ellapsedTime;

  // UPDATE operations start

  player.pos.x += dt * controls.x * SPEED;
  player.pos.y += dt * controls.y * SPEED;


  camera.update();

  cameraRect.pos.x = camera.pos.x;
  cameraRect.pos.y = camera.pos.y;




  pStats.text = `player: (${Math.round(player.pos.x)},${Math.round(player.pos.y)})`;
  camStats.text = `camera: (${Math.round(camera.pos.x)}, ${Math.round(player.pos.y)})`

  // worldSize.w = renderer.canvas.width + renderer.canvas.width
  // worldSize.h = renderer.canvas.height + renderer.canvas.height 
  
  player.pos.x =clamp(player.pos.x,0,worldSize.w - player.w);
  player.pos.y = clamp(player.pos.y, 0, worldSize.h - player.h);

  bgTexture.w = worldSize.w;
  bgTexture.h = worldSize.h;
  // UPDATE operations end



  // renderers and  grid debugger
  renderer.render(scene);
  // drawDebugGrid(renderer.ctx, HEIGHT / CELLSIZE, WIDTH / CELLSIZE, CELLSIZE);

}

requestAnimationFrame(loop);
