import { renderGrid } from "./DebugGrid";
import Render from "./Render";
import { CELLSIZE, HEIGHT, MAX_DELTA, WIDTH } from "./constants";

const { ctx } = new Render();

let dt = 0;
let t = 0;

function loop(ellapsedTime: number) {
  dt = Math.min(MAX_DELTA, (ellapsedTime - t) * 0.001);
  t = ellapsedTime;

  ctx.clearRect(0, 0, WIDTH, HEIGHT);


  renderGrid(ctx, HEIGHT / CELLSIZE, WIDTH / CELLSIZE, CELLSIZE, CELLSIZE);


  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
