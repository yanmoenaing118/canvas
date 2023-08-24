import { clamp } from "./utils";
const canvas = document.createElement("canvas") as HTMLCanvasElement;
canvas.style.border = "1px solid gray";
document.body.appendChild(canvas);
const w = window.innerWidth;
const h = window.innerHeight;

canvas.width = w;
canvas.height = h;

export const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
let dt = 0;
let time = 0;

const controllerCircle = {
  r: 66,
  x: 66,
  y: h - 66,
};

const controllerLine = {
  length: 0,
  x: controllerCircle.x,
  y: controllerCircle.y,
  headX: 0,
  headY: 0,
};

const player = {
  x: w / 3,
  y: h / 3,
  w: 32,
  h: 32,
  dir: 0,
  speed: 200
};

function distanceBetweenPoint(x1: number, y1: number, x2: number, y2: number) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx - dy * dy);
}

function iSinsideCirlce(x: number, y: number) {
  const dx = x - controllerCircle.x;
  const dy = y - controllerCircle.y;
  const distance = Math.sqrt(dx * dx - dy * dy);
  return distance < controllerCircle.r;
}

function drawControllerCircle() {
  drawCircle(controllerCircle.r, controllerCircle.x, controllerCircle.y);
}

function drawControlLine() {
  ctx.save();
  ctx.translate(controllerLine.x, controllerLine.y);
  ctx.strokeStyle = "red";
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(controllerLine.headX, controllerLine.headY);
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
}

function drawCircle(r: number, x: number, y: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.beginPath();
  ctx.strokeStyle = "green";
  ctx.lineWidth = 2;
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
}

function angle(x1: number, y1: number, x2: number, y2: number) {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.atan2(dy, dx);
}

function updateControllerCircle(dt: number) {}

function drawPlayer() {
  ctx.save();
  ctx.translate(player.x, player.y);
  ctx.fillStyle = "rgba(22,0,0,0.4)";
  ctx.fillRect(0, 0, player.w, player.h);
  ctx.restore();
}

function updatePlayer(dt: number) {
    // player.x += Math.cos(player.dir) * dt * player.speed;
    // player.y += Math.sin(player.dir) * dt * player.speed;

    player.x = clamp(player.x, 0, w - player.w);
    player.y = clamp(player.y, 0, h - player.h)
}

function loop(ellapsedTime: number) {
  ctx.clearRect(0, 0, w, h);

  dt = (ellapsedTime - time) * 0.001;
  time = ellapsedTime;

  updateControllerCircle(dt);
  updatePlayer(dt);

  drawControllerCircle();
  drawPlayer();
  drawControlLine();

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

canvas.addEventListener("click", (e) => {
  const x = e.pageX;
  const y = e.pageY;
  console.log("clicked ", x, y);
  if (iSinsideCirlce(x, y)) {
  }
});

canvas.addEventListener("touchstart", (e) => {});

canvas.addEventListener("touchmove", (e) => {
  e.preventDefault();
  const touchList = e.changedTouches;

  for(let i = 0 ; i < touchList.length; i++) {
    const touch = touchList[i];
    const { pageX: x1, pageY: y1 } = touch;
  
    const distance = distanceBetweenPoint(
      x1,
      y1,
      controllerCircle.x,
      controllerCircle.y
    );
  
    controllerLine.length = distance;
    controllerLine.headX = x1 - controllerCircle.x;
    controllerLine.headY = y1 - controllerCircle.y;
  
  //   player.x = x1 - controllerCircle.x;
  //   player.y = y1 - controllerCircle.y;
  
    const newPlayerPosX = x1 - controllerCircle.x;
    const newPlayerPosY = y1 - controllerCircle.y;

    player.x = controllerCircle.x + controllerLine.headX + distance;
    player.y = controllerCircle.y + controllerLine.headY + distance;

  
    // const dir = angle(newPlayerPosX, newPlayerPosY, player.x, player.y);
    // player.dir = dir;
  }
});

canvas.addEventListener("touchend", (e) => {
  controllerLine.length = 0;
  controllerLine.headX = 0;
  controllerLine.headY  = 0;
});