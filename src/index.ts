import KeyControls from "./KeyControls";
import Player from "./Player";
import Canvas from "./Renderer";
import Target from "./Target";
import { HEIGHT, MAX_DELTA, WIDTH } from "./constants";
import { hit } from "./helpers";

const { ctx } = new Canvas();
const controls = new KeyControls();

let lastTime = 0;
let dt = MAX_DELTA;

const player = new Player(controls);
const target = new Target();

function loop(ellapsed: number) {
  dt = (ellapsed - lastTime) * 0.001;
  lastTime = ellapsed;

  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  player.render(ctx);
  target.render(ctx);

  player.update(dt);

  if(hit(player,target)) {
    console.log('hit')
  }

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
