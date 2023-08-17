import { renderGrid } from "./DebugGrid";
import KeyControls from "./KeyControls";
import RotatedObject from "./RotatedObject";
import State from "./State";

import { CELLSIZE, HEIGHT, MAX_DELTA, WIDTH } from "./constants";
import { clamp } from "./utils";

const canvas = document.createElement("canvas") as HTMLCanvasElement;
export const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
document.body.appendChild(canvas);
// canvas.style.margin = "30px";
canvas.style.boxShadow = "0 0 3px rgba(0,0,0,0.3)";
canvas.width = WIDTH;
canvas.height = HEIGHT;
const dpr = window.devicePixelRatio;
const rect = canvas.getBoundingClientRect();
canvas.width = rect.width * dpr;
canvas.height = rect.height * dpr;
ctx.scale(dpr, dpr);
canvas.style.width = `${rect.width}px`;
canvas.style.height = `${rect.height}px`;

let dt = 0;
let t = 0;

const r = new RotatedObject();

r.pos.x = CELLSIZE * 4;
r.pos.y = CELLSIZE * 3;

const RED = "red";
const BLUE = "blue";
const GREEN = "green";
const colors = [RED, BLUE, GREEN];
const state = new State(RED);

function loop(ellapsedTime: number) {
  dt = Math.min(MAX_DELTA, (ellapsedTime - t) * 0.001);
  t = ellapsedTime;

  ctx.clearRect(0, 0, WIDTH + CELLSIZE, HEIGHT + CELLSIZE);
  ctx.save();

  r.update(dt, t);
  state.update(dt);

  if (state.time > 1) {
    switch (state.get()) {
      case RED:
        state.set(GREEN);
        break;
      case GREEN:
        state.set(BLUE);
        break;
      case BLUE:
        state.set(RED);
        break;
      default:
        state.set("pink");
    }
  }

  r.fill = state.get();

  r.render(ctx);
  renderGrid(ctx, HEIGHT / CELLSIZE, WIDTH / CELLSIZE, CELLSIZE, CELLSIZE);

  ctx.restore();

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
