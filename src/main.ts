import Circle from "./Circle";
import renderGrid from "./Grid";
import Vec from "./Vec";
import Walker from "./Walker";
import { h, w } from "./canvas";
import renderUpdate from "./loop";
import randomColor from "randomcolor";

const circles: Circle[] = [];


for(let i = 0 ; i < 5000; i++ ) {
  const circle = new Circle();
  circle.fill = randomColor({
    format: 'rgba'
  });
  circle.radius = 5;
  circles.push(circle);
}


function update(dt: number, t: number) {
  circles.forEach(circle => circle.update(dt))
}

function render(ctx: CanvasRenderingContext2D) {
  // renderGrid(ctx, w, h, 64 * 0.5);
  circles.forEach(circle => circle.render(ctx));
}

renderUpdate(render, update, true);
