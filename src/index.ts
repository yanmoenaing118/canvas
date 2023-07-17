import Grid from "./Grid";
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

const grid = new Grid(WIDTH, HEIGHT);
const player = new Player(controls);
const target = new Target();

let targets: Target[] = [];
function initTargets() {
  for (let i = 0; i < 100; i++) {
    targets.push(new Target());
  }
}
initTargets();

function updateTargets(dt: number, t: number) {
  targets = targets.filter((target) => !target.gone);
  targets.forEach((target) => target.update(dt, t));
  if(targets.length === 0) initTargets()
}

function renderTargets() {
  targets.forEach((target) => target.render(ctx));
}

function loop(ellapsed: number) {
  dt = (ellapsed - lastTime) * 0.001;
  lastTime = ellapsed;

  player.update(dt, lastTime * 0.001);
//   target.update(dt, lastTime * 0.001);
  updateTargets(dt, lastTime * 0.001);
  targets.forEach((target) => {
    if (hit(player, target)) {
      target.gone = true;
    }
  });

  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  player.render(ctx);
//   target.render(ctx);
  renderTargets();
  grid.render(ctx);

  if (hit(player, target)) {
    target.relocate();
  }

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
