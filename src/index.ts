const canvas  = document.createElement("canvas");
document.body.appendChild(canvas);
export const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const w = window.innerWidth;
const h = 100;


canvas.width = w;
canvas.height = h;


setResolution(canvas, ctx);

let unit = "s";
let min = 2;
let seconds = min * 60; // 1 min
let secondGap = 10; // 10s
let tenSecondGap = 100; // 100px
let timeLineLength = (seconds / secondGap) * tenSecondGap;
let totalBlock = Math.floor(timeLineLength / tenSecondGap);

let unitLgLineLength = 15;
let unitLgLineWidth = 1;


let timeFormat = "00:00"; // mm:ss

console.log(totalBlock);

function getTimeFormat(timeGap: number, index: number, unit: string) {
  let divider = 1;
  let min = 0;
  let sec = 0;
  let minStr = "";
  let secStr = "";

  if(unit == "s") {
    divider = 60;
    min = Math.floor((index * timeGap) / divider);
    sec = Math.floor((index * timeGap) % divider);
  }

  minStr = `${min}`;
  secStr = `${sec}`;

  if(min <= 9) minStr = `0${min}`;
  if((index * timeGap) % divider == 0) secStr = `0${sec}`;
   

  return `${minStr}:${secStr}`;
}

let i = 0;
function loop(){ 
  ctx.clearRect(0,0,canvas.width, canvas.height);


  for(i = 0; i < totalBlock + 1; i++){ 
    const x = i * tenSecondGap;
    const y = 0;
    const time = getTimeFormat(secondGap, i, unit);
    ctx.save();
    ctx.lineWidth = unitLgLineWidth;
    ctx.translate(x, y);
    ctx.fillText(time, 0, unitLgLineLength * 2);
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(0, unitLgLineLength);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }
  


  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);



function setResolution(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const dpr = window.devicePixelRatio;
  const rect = canvas.getBoundingClientRect();

  canvas.width = dpr * rect.width;
  canvas.height  = dpr * rect.height;

  ctx.scale(dpr, dpr);
  canvas.style.width = `${rect.width}px`;
  canvas.style.height = `${rect.height}px`;

  canvas.style.borderBottom = '1px solid black';
}