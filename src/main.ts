import Circle from "./Circle";
import renderGrid from "./Grid";
import Line from "./Line";
import ScaledCircle from "./ScaledCircle";
import Vec from "./Vec";
import Walker from "./Walker";
import { canvas, h, w } from "./canvas";
import renderUpdate from "./loop";
import randomColor from "randomcolor";

const circles: Circle[] = [];

// Draw a heart shape
function drawHeart(ctx: CanvasRenderingContext2D) {}

// Clip the canvas to the heart shape
function clipToHeart(ctx: CanvasRenderingContext2D) {
  ctx.save();

  ctx.restore();
}

for (let i = 0; i < 10000; i++) {
  const circle = new Circle();
  //   circle.pos.set(0, 0);
  circle.vel.set(Math.random() + 0.2,0);
  circle.radius = 1.5;
  circle.fill = "red";
  circles.push(circle);
}

function update(dt: number, t: number) {
  circles.forEach((c) => c.update(dt));
}

function render(ctx: CanvasRenderingContext2D) {
  ctx.save();
  ctx.translate(w / 2 - 150 * 1.5, h / 2 - 75 * 2);
  ctx.scale(1.5,1.5);
  ctx.beginPath();
  ctx.moveTo(150, 75);
  ctx.bezierCurveTo(150, 37, 120, 0, 75, 0);
  ctx.bezierCurveTo(30, 0, 0, 37, 0, 75);
  ctx.bezierCurveTo(0, 110, 150, 200, 150, 260);
  ctx.bezierCurveTo(150, 200, 300, 110, 300, 75);
  ctx.bezierCurveTo(300, 37, 270, 0, 225, 0);
  ctx.bezierCurveTo(180, 0, 150, 37, 150, 75);
  ctx.closePath();


  // Clip the canvas to the heart shape path
  ctx.clip();
  circles.forEach((c) => c.render(ctx));

  //   renderGrid(ctx, w, h, 32);
  ctx.restore();

}

renderUpdate(render, update, true);
