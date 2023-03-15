interface Position {
  x: number;
  y: number;
}

class Rect {
  fill: string;
  pos: Position;
  width: number;
  height: number;

  constructor(width: number, height: number, fill: string) {
    this.width = width;
    this.height = height;
    this.fill = fill;
    this.pos = { x: 0, y: 0 };
  }
}

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
let selectedObject: any;
let threshold: number = 10;

// canvas.addEventListener("mousemove", function (e: MouseEvent) {
//   if (
//     checkInsideRect(
//       {
//         x: e.clientX,
//         y: e.clientY,
//       },
//       rect
//     )
//   ) {
//     console.log(rect);
//   }
// });

canvas.addEventListener("click", function (e: MouseEvent) {
  if (
    checkInsideRect(
      {
        x: e.clientX,
        y: e.clientY,
      },
      rect
    )
  ) {
    console.log(rect);
  }
});

function checkInsideRect(clickedPos: Position, rect: Rect) {
  let inside: boolean = false;
  if (
    clickedPos.x <= rect.pos.x + rect.width &&
    clickedPos.y <= rect.pos.y + rect.height &&
    clickedPos.x >= rect.pos.x &&
    clickedPos.y >= rect.pos.y
  ) {
    inside = true;
  }

  return inside;
}

let delta: number = 0;
let lastTimeStamp: number = 0;

const rect = new Rect(100, 100, "pink");
rect.pos.x = canvas.width / 2 - 50;
rect.pos.y = canvas.height / 2 - 50;

function draw(currentTimestamp: number) {
  requestAnimationFrame(draw);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  /** update */

  /** render */
  ctx.save();
  ctx.translate(rect.pos.x, rect.pos.y);
  ctx.fillStyle = rect.fill;
  ctx.fillRect(0, 0, rect.width, rect.height);
  ctx.restore();

  delta = (currentTimestamp - lastTimeStamp) * 0.001;
  lastTimeStamp = currentTimestamp;
}

requestAnimationFrame(draw);
