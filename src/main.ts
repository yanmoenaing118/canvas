import Ball from "./Ball";
import KeyControls from "./KeyControls";
import Text from "./Text";
import { h } from "./canvas";
import renderUpdate from "./loop";

const controls = new KeyControls();

const gravity = 32;
const launchForce = -205;
let ball = new Ball(16, 16, h - 16, "red");

const text = new Text("y: 0, v: 0", 10, 10, "green", "22px arial");

function render(ctx: CanvasRenderingContext2D) {
  ball.render(ctx);
  text.render(ctx);
}

function update(dt: number, t: number) {
  const ox = dt * 800 * controls.x;
  let yo = 0;

  if (ball.jumping) {
    ball.vel += gravity * dt;
    yo = ball.vel;
  }

  if (!ball.jumping && controls.action) {
    ball.vel = launchForce;
    yo = ball.vel;
    ball.jumping = true;
    ball.pos.y += yo;
  }

  ball.pos.x += ox;
  console.log(`
    y: ${ball.pos.y},
    v: ${yo}
    `);

  text.text = `y: ${ball.pos.y.toFixed(3)} | yo: ${yo.toFixed(
    3
  )} | velocity: ${ball.vel.toFixed(3)}`;
  ball.update(dt, t);
}

renderUpdate(render, update);
