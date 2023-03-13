const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
const { width: w, height: h } = canvas;
let delta: number = 0,
  totalTime: number = 0;

function draw(ellapsedTime: number) {
  delta = (ellapsedTime - totalTime) * 0.001;
  totalTime = ellapsedTime;

  ctx.clearRect(0, 0, w, h);
  ctx.setTransform(1, 0, 0, 1, 0, 0);


  animateText(ctx, delta);

//   ctx.save();
//   ctx.fillStyle = "red";
//   ctx.translate(w / 2, h / 2);
//   ctx.fillRect(0, 0, 100, 100);
//   ctx.restore();

//   ctx.save();
//   ctx.fillStyle = "green";
//   ctx.translate(100, 100);
//   ctx.fillRect(0, 0, 100, 100);
//   ctx.restore();

//   ctx.save();
//   ctx.fillStyle = "pink";
//   ctx.translate(100, 0);
//   ctx.fillRect(0, 0, 100, 100);
//   ctx.restore();

  requestAnimationFrame(draw);
}

let textX = 0;
let textY = 0;
let textSize = 50;
let textOpacity = 0;

function animateText(ctx: CanvasRenderingContext2D, delta: number) {
  textX = w / 2;
  textY = h / 2;
  if (textSize > 20) {
    textSize -= 0.5;
  }
  if (textOpacity < 1) {
    textOpacity += 0.01;
  }


  ctx.save();
  ctx.fillStyle = "darkred";
  ctx.textAlign = "center";

  ctx.globalAlpha = textOpacity;
  ctx.font = `${textSize}px Arial`;
  ctx.translate(textX, textY);
  ctx.fillText("Hello Canvas", 0, 0);

  ctx.restore();
}

requestAnimationFrame(draw);
