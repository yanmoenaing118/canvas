import Ball from "./Ball";
import KeyControls from "./KeyControls";
import { h } from "./canvas";
import renderUpdate from "./loop";

const controls = new KeyControls();

const gravity = 32;
let ball = new Ball(16, 16, h - 16, "red");

function render(ctx: CanvasRenderingContext2D) {
  ball.render(ctx);
}

function update(dt: number, t: number) {
  const ox = dt * 800 * controls.x;
  let yo = 0;

  if (ball.jumping) {
    ball.vel += gravity * dt;
    yo = ball.vel;
  }

  if (!ball.jumping && controls.action) {
    ball.vel = -18;
    yo = ball.vel;
    ball.jumping = true;
  }

  ball.pos.y += yo + Math.cos(t * 0.05);
  ball.pos.x += ox + Math.cos(t * 0.05);
  console.log(`
    y: ${ball.pos.y},
    v: ${yo}
    `);

  ball.update(dt, t);
}

renderUpdate(render, update);
