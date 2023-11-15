import renderGrid from "./Grid";
import KeyControls from "./KeyControls";
import Rect from "./Rect";
import Vec from "./Vec";
import { h, w } from "./canvas";
import renderUpdate from "./loop";
const controls = new KeyControls();

const size = 64 * 0.5;

const r1 = new Rect(size, size, size, size, "green");
r1.pos.set( w / 2, h / 2)
const r2 = new Rect(size * 4, size * 4, size, size, "pink");

const r3 = new Rect(size, size, size, size, "blue");

console.log(r3.pos.mag());

// const vec = new Vec(size * 4, size * 3);

// console.log(vec);
// console.log(vec.mag());
// console.log(vec.normalize());
function render(ctx: CanvasRenderingContext2D) {
  renderGrid(ctx, w, h, 64 * 0.5);
  r1.render(ctx);
  r2.render(ctx);
  r3.render(ctx);
}

let x,
  y = 0;

function update(dt: number, t: number) {
  x = dt * controls.x * 320;
  y = dt * controls.y * 320;
  r2.pos.add({x, y});
  r3.pos = r1.pos
    .clone()
    .add(r2.pos)
    .normalize()
    .multiply(100)
    .add({ x: r1.pos.x, y: r1.pos.y});
  const dist = Math.sqrt((r3.pos.x - r1.pos.x ) * (r3.pos.x - r1.pos.x ) + (r3.pos.y - r1.pos.y) * (r3.pos.y - r1.pos.y));
  console.log(dist);
    
}
renderUpdate(render, update);
