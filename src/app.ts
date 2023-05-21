import { Position } from "./types";

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;
const { width, height } = canvas;
const rangeEl = document.querySelector("input") as HTMLInputElement;
rangeEl.value = "0";

const img = new Image();
img.src = "./spaceship.png";

let w = 32;
let h = 32;

let t = 0;
let dt = 1 / 60;

let rotation = 0;

let anchor: Position = {
  x: -16,
  y: -16,
};

function loop(lastEllapsedTime: number) {
  context.clearRect(0, 0, width, height);
  context.save();
  context.fillStyle = "red";
  context.clearRect(0, 0, width, height);

  context.fillStyle = "green";
  //   context.rotate(Math.PI / 4);

  context.translate(width / 2, height / 2);

  rotation += 0.05;
  context.rotate(rotation);
  //   context.scale(-1.5, 1.5);
  context.translate(anchor.x, anchor.y);

  // context.fillRect((w / 2) * -1, (h / 2) * -1, w, h);
  context.drawImage(img, 0, 0);
  context.restore();
  requestAnimationFrame(loop);
}

function updateRotation() {
  // rotation += ;
}

rangeEl.addEventListener("input", function () {
  rotation = Number(this.value);
  console.log(rotation);
});

window.onload = function () {
  requestAnimationFrame(loop);
};
