import Ball from "./Ball";
import KeyControls from "./KeyControls";
import Text from "./Text";
import { h } from "./canvas";
import renderUpdate from "./loop";

const controls = new KeyControls();

const gravity = 32;
const launchForce = -14 ;
let ball = new Ball(16, 16, h - 16, "green");
let ball2 = new Ball(16, 200, h - 16, "pink");
ball2.pos.y += launchForce;

let vel = launchForce;
vel += 0.01666667 * gravity;
const yo = vel;

console.log(yo);

console.log(ball.pos.y + yo);
// console.log(ball2.pos);

const text = new Text("y: 0, v: 0", 10, 10, "green", "22px arial");

function render(ctx: CanvasRenderingContext2D) {
  ball.render(ctx);
  ball2.render(ctx);
  text.render(ctx);
}

function update(dt: number, t: number) {
  const ox = dt * 800 * controls.x;
  let yo = 0;

  if (!ball.jumping && controls.action) {
    ball.vel = launchForce;
    ball.jumping = true;
  }

  
  if (ball.jumping) {
    ball.vel += gravity * dt;
    yo = ball.vel;
  }
  if(ball.vel > 0 ) {
    // yo = 0;
    // ball.jumping  = false;
  }

  ball.pos.x += ox;
  ball.pos.y += yo;

  if(ball.vel <= -14 + gravity * dt) {
    // debugger
  }

  

  console.log(`
    y: ${ball.pos.y},
    v: ${yo}
    `);

  text.text = `ball.pos.y += yo ( ${ball.pos.y.toFixed(3)} )| yo: ${yo.toFixed(
    3
  )} | velocity: ${ball.vel.toFixed(3)}`;
  ball.update(dt, t);
}

renderUpdate(render, update);
