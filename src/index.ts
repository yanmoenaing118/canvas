import { renderGrid } from "./DebugGrid";
import Renderer from "./Renderer";
import { CELLSIZE, HEIGHT, WIDTH } from "./constants";

const { ctx, canvas } = new Renderer(WIDTH, HEIGHT);
let dt = 0;
let time = 0;

function loop(ellapsedTime: number) {
  requestAnimationFrame(loop);
  dt = (ellapsedTime - time) * 0.001;
  time = ellapsedTime;

  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  renderGrid(
    ctx,
    HEIGHT / CELLSIZE,
    WIDTH / CELLSIZE,
    CELLSIZE,
    CELLSIZE,
    "black"
  );
}

requestAnimationFrame(loop);
