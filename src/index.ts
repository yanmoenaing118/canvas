import { clamp, setStyles } from "./utils";

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
export const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const w = window.innerWidth;
const h = 100;

canvas.width = w;
canvas.height = h;

setResolution(canvas, ctx);

const scrollContainer = document.createElement("div");
const scrollEl = document.createElement("div");
scrollContainer.appendChild(scrollEl);
setStyles(scrollContainer, {
  maxWidth: `${window.innerWidth}px`,
  overflow: "auto",
});
setStyles(scrollEl, {
  height: "18px",
});
document.body.appendChild(scrollContainer);

let unit = "s";
let min = 2;
let seconds = min * 60; // 1 min
let secondGap = 10; // 10s
let tenSecondGapLength = 100; // 100px
let timeLineLength = (seconds / secondGap) * tenSecondGapLength;
let totalBlock = Math.floor(timeLineLength / tenSecondGapLength);

let unitLgLineLength = 15;
let unitLgLineWidth = 1;

function getTimeFormat(timeGap: number, index: number, unit: string) {
  let divider = 1;
  let min = 0;
  let sec = 0;
  let minStr = "";
  let secStr = "";

  if (unit == "s") {
    divider = 60;
    min = Math.floor((index * timeGap) / divider);
    sec = Math.floor((index * timeGap) % divider);
  }

  minStr = `${min}`;
  secStr = `${sec}`;

  if (min <= 9) minStr = `0${min}`;
  if ((index * timeGap) / 10 < 1) secStr = `0${sec}`;

  return `${minStr}:${secStr}`;
}

let i = 0;
let x = 0;
function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  timeLineLength = (seconds / secondGap) * tenSecondGapLength;
  totalBlock = Math.floor(timeLineLength / tenSecondGapLength);

  console.log(totalBlock);

  ctx.save();
  ctx.translate(-x, 0);

  for (i = 0; i < totalBlock + 1; i++) {
    const x = i * tenSecondGapLength;
    const y = 0;
    const time = getTimeFormat(secondGap, i, unit);
    ctx.save();
    ctx.lineWidth = unitLgLineWidth;
    ctx.translate(x, y);
    ctx.font = "14px arial";
    ctx.fillText(time, 0, unitLgLineLength * 2);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, unitLgLineLength);
    // ctx.moveTo(tenSecondGapLength / 2, 0);
    // ctx.lineTo(tenSecondGapLength / 2, unitLgLineLength);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }

  ctx.restore();

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

canvas.addEventListener("wheel", (e) => {
  e.preventDefault();
  // secondGap += 2;
  setStyles(scrollEl, {
    width: `${timeLineLength}px`,
  });
  if (e.deltaY > 0) {
    tenSecondGapLength -= 1;
    if(tenSecondGapLength % 20 == 0) {
      console.log(tenSecondGapLength)
      secondGap += 1;
    }
  } else {
    tenSecondGapLength += 1;
    if(tenSecondGapLength % 20 == 0) {
      console.log(tenSecondGapLength)
      secondGap -= 1;
    }
  }

 
  tenSecondGapLength = clamp(tenSecondGapLength, 100, 300);
  console.log(`click: tenSecondGapLength ${tenSecondGapLength}`);
});

scrollContainer.addEventListener("scroll", e => {
  const scrollLef = scrollContainer.scrollLeft;
  x = scrollLef;
  console.log(scrollLef);
})

function setResolution(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  const dpr = window.devicePixelRatio;
  const rect = canvas.getBoundingClientRect();

  canvas.width = dpr * rect.width;
  canvas.height = dpr * rect.height;

  ctx.scale(dpr, dpr);
  canvas.style.width = `${rect.width}px`;
  canvas.style.height = `${rect.height}px`;

  canvas.style.borderBottom = "1px solid black";
}
