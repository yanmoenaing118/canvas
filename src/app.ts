const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;
const { width: w, height: h } = canvas;

let start = 0;
let lastTimeStamp = 0;
let delta = 0;

let ball = {
  x: 0,
  y: 64,
  size: 64,
  last: 0,
};

function loop(ellapsedTime: number) {
  delta = (ellapsedTime - lastTimeStamp) * 0.001; // will sresult in 0.016666s
  lastTimeStamp = ellapsedTime;

  /**
   * Game Logic Will be here
   */
  context.fillStyle = "pink";
  context.fillRect(0, 0, w, h);
  context.save();

  const speed = 128 * delta; // ball.x will be 128px after 1s because the loop run 60times in 1s

  ball.x = ball.x >= w ? 0 : ball.x + speed;
  context.fillStyle = "white";
  context.fillRect(ball.x, ball.y, ball.size, ball.size);

  context.restore();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
