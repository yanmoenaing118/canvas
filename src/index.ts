import { Position } from "./interfaces";

function createCanvas(w: number, h: number) {
  const canvasEl = document.createElement('canvas') as HTMLCanvasElement;
  canvasEl.width = w;
  canvasEl.height = h;
  document.getElementById('board')?.appendChild(canvasEl);
  return {
    canvas: canvasEl,
    context: canvasEl.getContext('2d')
  }
}


const width = 480;
const height = 300;
const canvas = createCanvas(width, height);
const context = canvas.context as CanvasRenderingContext2D;


function drawPlayer(pos: Position) {
  const size = 40;
  context.save();
  context.translate(pos.x, pos.y);
  context.fillStyle = 'green';
  context.fillRect(0,0, size, size);
  context.restore();
}


const playerPosition = {
  x: 0,
  y: 0
}
drawPlayer(playerPosition);


