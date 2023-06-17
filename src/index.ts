import Camera from "./Camera";
import Container from "./Container";
import drawDebugGrid from "./DebugGrid";
import KeyControls from "./KeyControls";
import Player from "./Player";
import Renderer from "./Renderer";
import { CELLSIZE, HEIGHT, SPEED, WIDTH } from "./constants";
const speed = SPEED;
const w = WIDTH;
const h = HEIGHT;
let dt = 0;
let time = 0;

const renderer = new Renderer(w, h);
const { ctx } = renderer;


const scene = new Container(0,0,w, h);
const camera = new Camera(0,0,w,h);
const player = new Player(0,0,CELLSIZE, CELLSIZE);

player.shape = 'rect';


camera.add(player);
scene.add(camera);


function loop(ellapsedTime: number) {
  requestAnimationFrame(loop);

  dt = (ellapsedTime - time) * 0.001;
  time = ellapsedTime;

  ctx.clearRect(0, 0, w, h);


  renderer.render(scene);
  drawDebugGrid(ctx, HEIGHT / CELLSIZE, WIDTH / CELLSIZE, CELLSIZE);


}

requestAnimationFrame(loop);
