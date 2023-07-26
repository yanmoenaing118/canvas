import Player from "./Player";
import { TouchControl } from "./TouchControl";


function setup() {
 
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);

  

  canvas.style.border = "1px solid black";
  canvas.style.boxSizing = "border-box";

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight / 2;

  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  const controls = new TouchControl(canvas);

  const player = new Player();

  function loop() {
    requestAnimationFrame(loop);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    player.render(ctx);
    controls.render(ctx);
  }

  requestAnimationFrame(loop);


}

document.addEventListener("DOMContentLoaded", setup);
