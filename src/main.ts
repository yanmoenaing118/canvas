
import renderGrid from "./Grid";
import Rect from "./Rect";
import Vec from "./Vec";
import { h, w } from "./canvas";
import renderUpdate from "./loop";
import { clamp } from "./utils";

const size = 64;

const rect = new Rect(size,size,size * 0.1,size * 0.1, "green");
const rectVecMagnitude = rect.pos.set(0, 0).mag();

console.log('rectVecMagnitude ', rectVecMagnitude);

function render(ctx: CanvasRenderingContext2D) {

  renderGrid(ctx, w, h, 64);
  rect.render(ctx);
}

function update(dt: number, t: number) {

}
renderUpdate(render, update);
