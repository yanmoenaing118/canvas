import lib from "../pop/index";
const { KeyControls} = lib;


const controls = new KeyControls();


const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;
const { width: w, height: h } = canvas;

const stats = document.querySelector("p") as HTMLParagraphElement;

let start = 0;
let lastTimeStamp = 0;
let delta = 0;

class Ball {
  x: number;
  y: number;
  size: number;
  speed: number;
  constructor(x: number, y: number, size: number, speed: number) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
  }
}

const ball = new Ball(50, 50, 25, 2000);

const balls: Array<Ball> = [];

function loop(ellapsedTime: number) {
  delta = (ellapsedTime - lastTimeStamp) * 0.001; // will sresult in 0.016666s
  lastTimeStamp = ellapsedTime;

  /**
   * Game Logic Will be here
   */
  context.fillStyle = "black";
  context.fillRect(0, 0, w, h);
  context.save();

  /** Global Settings */
  // ball.x will be 128px after 1s because the loop run 60times in 1s

  ball.x += controls.x * ball.speed * delta;
  ball.y += controls.y * ball.speed * delta;

  context.fillStyle = `white`;
  context.globalAlpha = 0.5;

  context.beginPath();
  context.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2, false);
  context.fill();
  context.restore();
  stats.textContent = `Total ball ${balls.length}`;
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
