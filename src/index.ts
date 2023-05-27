import { Player } from "./Entities";
import { KeyControls } from "./KeyControls";
import { drawTimestamp } from "./Objects";
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

const width = 400;
const height = 400;
const canvas = createCanvas(width, height);
const context = canvas.context as CanvasRenderingContext2D;
let dt = MAX_FRAME ;
let lastEllapsedTime = 0;
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
  context.lineWidth = 1;
  context.strokeStyle = 'black';
  for (let i = 0; i <= width / colWidth; i++) {
    context.save();
    context.beginPath();
    // context.lineWidth = .5;
    context.translate(i * colWidth, 0);
    context.moveTo(0, 0);
    context.lineTo(0, context.canvas.height);
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


const gridSize = 40;
let player: Player = new Player();
player.w = gridSize;
player.h = gridSize;
player.pos.x = gridSize * 2;
player.pos.y = gridSize;

player.anchor.y = 0;
let image = new Image();
image.src  = './logo.ico';

let rotation = 0.1;

function drawPlayer(){
  // player.pos.x = player.pos.x + controls.x * dt * 720;
  context.save();
  /**
   * translate scale rotate
   */
  context.translate(player.pos.x, player.pos.y);  
  // context.rotate(player.rotation);
  // context.fillRect(0,0,player.w, player.h);
  context.scale(player.scale.x * 2 , player.scale.y * 2 );
  context.translate(player.anchor.x,0);

  context.translate(30,30);
  context.rotate(rotation += 0.1)
  context.translate(-30,-30);
  // context.scale(player.scale.x, player.scale.y);
  // context.translate(player.w/ 2 , player.h / 2 );
  context.drawImage(image, 0, 0, gridSize, gridSize);
  context.restore();
}

let times: number[] = [];

/**
 * Sprite
 */
let img = new Image();
img.src = './spider10.png';
img.onload = drawSprite;
let sprite = {
  pos: {x: 0,y:0},
  frame: {x: 0, y: 2},
  w: 64, h: 64,
  img: img
}

function drawSprite() {
  
  context.save();
  context.translate(sprite.pos.x,sprite.pos.y);
  context.scale(1.5,1.5);
  context.drawImage(
    sprite.img,
    sprite.frame.x * sprite.w,
    sprite.frame.y * sprite.h,
    sprite.w, sprite.h,
    0,0,
    sprite.w,sprite.h
  )
  context.restore();
}

/** End Sprite */


function loop(time: number) {
  // console.log('h')
  const sec = (time * 0.001) /  .125;
  sprite.frame = {
    x:0,
    y: 2
  }
  const dx = sprite.pos.y + dt * 64;
  if(dx < height) {
    sprite.pos.y = dx;
  } else {
    sprite.pos.y = 0;
  }
  sprite.frame.x = Math.floor(sec) % 4;
  // console.log(Math.floor(sec) % 4)
  if((time / 1000) <= 1) {
    times.push(time);
    console.log(Math.floor(times[times.length -1]))
  } else {
    // console.log(time / 1000)
  }
  // dt = Math.min(MAX_FRAME, (time - lastEllapsedTime ) * 0.001);
  // lastEllapsedTime = time;


  context.clearRect(0, 0, width, height);

  drawSprite();
  // player.scale.x = controls.x ? controls.x : 1;
  // player.anchor.x = player.scale.x == -1 ? -60 : 0;

  // drawPlayer();

  // context.save();
  // context.fillStyle = 'red';
  // context.translate(gridSize * 5, gridSize * 2);
  // context.fillRect(0,0,gridSize, gridSize);
  // context.restore();
  // // drawPlayer();
  // // drawPlayer();
  // drawGrid(width, height, gridSize,gridSize);

  // drawTimestamp(time, context)
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);