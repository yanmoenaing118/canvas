import { Player } from "./Entities";
import { KeyControls } from "./KeyControls";
import { MAX_FRAME } from "./constants";
import { Position } from "./interfaces";

function createCanvas(w: number, h: number) {
  const canvasEl = document.createElement("canvas") as HTMLCanvasElement;
  canvasEl.width = w;
  canvasEl.height = h;
  document.body.appendChild(canvasEl);
  return {
    canvas: canvasEl,
    context: canvasEl.getContext("2d"),
  };
}

const width = 600;
const height = 600;
const canvas = createCanvas(width, height);
const context = canvas.context as CanvasRenderingContext2D;

const controls = new KeyControls();

function drawGrid(
  width: number,
  height: number,
  colWidth: number = 40,
  rowWidth: number = 40
) {
  /**
   * draw cols
   */
  for (let i = 0; i <= width / colWidth; i++) {
    context.save();
    context.beginPath();
    context.lineWidth = 1;
    context.translate(i * colWidth, 0);
    context.moveTo(0, 0);
    context.lineTo(0, context.canvas.height + 4);
    context.stroke();
    context.restore();
  }

  /**
   * draw rows
   */
  for (let j = 0; j <= height / rowWidth; j++) {
    context.save();
    context.beginPath();
    context.lineWidth = 1;
    context.translate(0, j * rowWidth);
    context.moveTo(0, 0);
    context.lineTo(context.canvas.width, 0);
    context.stroke();
    context.restore();
  }
}


const gridSize = 60;
let player: Player = new Player();
player.w = gridSize;
player.h = gridSize;
player.pos.x = gridSize;
player.pos.y = gridSize;
let image = new Image();
image.src  = './logo.ico';
function drawPlayer(){
  context.save();
  /**
   * translate scale rotate
   */
  context.translate(player.pos.x, player.pos.y);  
  // context.rotate(player.rotation);
  // context.fillRect(0,0,player.w, player.h);
  context.scale(player.scale.x * 2, player.scale.y * 2);
  // context.scale(player.scale.x, player.scale.y);
  context.translate(player.w/ 2 * -1, player.h / 2 * -1);
  context.drawImage(image, 0, 0, gridSize, gridSize);
  context.restore();
}

function loop(time: number) {

  context.clearRect(0, 0, width, height);


  player.scale.x = controls.x ? controls.x : 1;

  drawPlayer();
  drawGrid(width, height, gridSize,gridSize);

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);