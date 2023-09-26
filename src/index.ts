import Ball from "./Ball";
import renderUpdate from "./loop";

let ball = new Ball(16, 16, 16, "red");

function render(ctx: CanvasRenderingContext2D) {
  ball.render(ctx);
}

function update(dt: number, t: number) {
  ball.pos.y += dt * 100;

  ball.update(dt, t);
}

renderUpdate(render, update);
