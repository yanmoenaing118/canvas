import lib from "../pop/index";
const { Container, KeyControls} = lib;



const stats = document.querySelector("p") as HTMLParagraphElement;
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;
const { width: w, height: h } = canvas;
let lastTimeStamp = 0; // will be total
let delta = 0; // 1s/60 60FPS



const controls = new KeyControls();


const scene = new Container();
const player1 =  {
  update: (delta: number, t: number): void => {
    console.log('update PLAYER_1', delta, t);
  }
}

const player2 =  {
  update: (delta: number, t: number): void => {
    console.log('update PLAYER_2: ', delta, t);
  }
}

scene.add(player1);
scene.add(player2);

function loop(ellapsedTime: number) {
  delta = (ellapsedTime - lastTimeStamp) * 0.001; // will sresult in 0.016666s
  lastTimeStamp = ellapsedTime;

  scene.update(delta,ellapsedTime);
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
