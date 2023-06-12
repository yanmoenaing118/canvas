const MAX_FRAME = 1 / 60;
const w = 320;
const h = 320;

const canvas = document.createElement("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

document.body.appendChild(canvas);

canvas.width = w;
canvas.height = h;

let dt = MAX_FRAME;
let time = 0;

let world = {
  pos: { x: 0, y: 0 },
  w: w * 2,
  h: h * 2,
};


const renderWorld = () => {
  ctx.save();
  ctx.fillStyle = 'red';
  ctx.translate(world.pos.x,world.pos.y);
  ctx.fillRect(0,0, world.w, world.h);
  ctx.restore();
}

const loop = (ellapsedTime: number) => {
  dt = Math.min(MAX_FRAME, (ellapsedTime - time) * 0.001);
  time = ellapsedTime;

  ctx.clearRect(0,0,w,h);


  renderWorld();

  requestAnimationFrame(loop);
};

requestAnimationFrame(loop);
