import Bat from "./Bat";
import Bullet from "./Bullet";
import { CELLSIZE, HEIGHT, MAX_DELTA, WIDTH } from "./constants";
import { renderGrid } from "./DebugGrid";
import KeyControls from "./KeyControls";
import Level from "./Level";
import Player from "./Player";
import { angle } from "./utils";
const canvas = document.createElement("canvas") as HTMLCanvasElement;
export const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
document.body.appendChild(canvas);

canvas.width = WIDTH;
canvas.height = HEIGHT;

let dt = 0;
let t = 0;

const map = new Level();
const controls = new KeyControls();
const player = new Player(controls, map, fireBullet);
const bat = new Bat();

const bullets: Bullet[] = [];

function fireBullet() {
  const angleToPlayer = angle(player.pos, bat.pos);
  const bullet = new Bullet();
  bullet.angle = angleToPlayer;
  bullets.push(bullet);
}


const loop = (ellapsedTime: number) => {
  requestAnimationFrame(loop);
  dt = Math.min((ellapsedTime - t) * 0.001, MAX_DELTA);
  t = ellapsedTime;

  player.update(dt,t * 0.001);
  bat.update(dt, t * 0.001);
  bullets.forEach( b => b.update(dt, t * 0.001))

  bullets.forEach(b => {
  })

  player.render();
  bullets.forEach(b => b.render(ctx))
  bat.render();

  
  // renderGrid(
  //   ctx,
  //   HEIGHT / CELLSIZE,
  //   WIDTH / CELLSIZE,
  //   CELLSIZE,
  //   CELLSIZE,
  //   "white"
  // );
};

requestAnimationFrame(loop);
