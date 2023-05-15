import { Player } from "./Entities";
import { KeyControls } from "./KeyControls";
import { Position } from "./interfaces";

function createCanvas(w: number, h: number) {
  const canvasEl = document.createElement("canvas") as HTMLCanvasElement;
  canvasEl.width = w;
  canvasEl.height = h;
  document.getElementById("board")?.appendChild(canvasEl);
  return {
    canvas: canvasEl,
    context: canvasEl.getContext("2d"),
  };
}

const width = 400;
const height = 300;
const canvas = createCanvas(width, height);
const context = canvas.context as CanvasRenderingContext2D;

const controls = new KeyControls();

function drawPlayer(pos: Position) {
  const size = 20;
  context.save();
  context.translate(pos.x, pos.y);
  context.fillStyle = "green";
  context.fillRect(0, 0, size, size);
  context.restore();
}

function drawTimestamp(ellapsedTime: number) {
  const totalMin = `${Math.round(ellapsedTime * 0.001)} sec`; // milli to sec
  const textWidth = context.measureText(totalMin).width;
  context.save();
  context.translate(width - textWidth - 20, height - 10);
  context.fillStyle = "black";
  context.font = "18px Consolas";
  context.fillText(totalMin, 0, 0);
  context.restore();
}

const players: Player[] = [];
const player: Player = new Player();
let playerFrameRate = .5; // 4s
let lastAppearedPlayer = 0;

players.push(player);

let dx = 0;
let dy = 0;
let speed = 100;
let dt = 1 / 60;
let lastEllapsedTime = 0;

function sec(milli: number) {
  return milli * 0.001;
}

function loop(ellapsedTime: number) {
  context.clearRect(0, 0, width, height);
  context.save();

  dt = Math.min((ellapsedTime - lastEllapsedTime) * 0.001, 1 / 60);
  lastEllapsedTime = ellapsedTime;

  if (sec(lastEllapsedTime) - lastAppearedPlayer > playerFrameRate) {
    const player = new Player();
    player.pos.x = Math.random() * width;
    player.pos.y = Math.random() * height;
    if(player.pos.y > height) {
      player.pos.y = 0;
    }
    players.push(player);
    lastAppearedPlayer = sec(lastEllapsedTime);
  }

  /**
   * loop all players and update
   */
  players.forEach((player: Player, i: number) => {
    player.pos.x += speed * dt * controls.x || 1;
    if (player.pos.x >= width) {
      player.pos.x = 20;
    }
  });


  
  /**
   * loop all players and render them
   */
  players.forEach((player: Player, i: number) => {
    drawPlayer({
      x: player.pos.x,
      y: player.pos.y,
    });
  });

  console.log(players.length)
  drawTimestamp(ellapsedTime);
  context.restore();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
