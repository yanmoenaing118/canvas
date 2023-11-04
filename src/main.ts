
import renderGrid from "./Grid";
import Rect from "./Rect";
import Vec from "./Vec";
import { h, w } from "./canvas";
import renderUpdate from "./loop";
import { clamp } from "./utils";

const size = 64;


const r1 = new Rect(size,size,size, size, 'green');
const r2 = new Rect(size*4,size *4, size, size, 'pink');

// console.log('rectVecMagnitude ', rectVecMagnitude);
// midpoint = (x1 + x2) / 2 , (y1 + y2) / 2

const midPoint = r1.pos.clone().add(r2.pos).multiply(0.5);

const r3 = new Rect(midPoint.x, midPoint.y, size, size, 'blue');

function render(ctx: CanvasRenderingContext2D) {

  renderGrid(ctx, w, h, 64);
  r1.render(ctx);
  r2.render(ctx);
  r3.render(ctx);
}

function update(dt: number, t: number) {

}
renderUpdate(render, update);
