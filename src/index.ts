import Player from "./Player";

function setup() {
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);

  canvas.style.border = "1px solid black";
  canvas.style.boxSizing = "border-box";

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  const player = new Player();

  function loop() {
    requestAnimationFrame(loop);

    ctx.clearRect(0,0,canvas.width,canvas.height);

    player.render(ctx);
  }

  requestAnimationFrame(loop);

  canvas.addEventListener("touchstart", touchStart);
  canvas.addEventListener("touchend", touchEnd);
  canvas.addEventListener("touchmove", touchMove);
  canvas.addEventListener("touchcancel", touchCancel);

  function touchStart(e: TouchEvent) {
    e.preventDefault();
    console.log("start", e.changedTouches);

    const touches = e.changedTouches;
    for (let i = 0; i < touches.length; i++) {
      const touch = touches[i];
      const x = touch.pageX - canvas.offsetLeft;
      const y = touch.pageY - canvas.offsetTop;

      // drawPath(x, y);
      player.pos.x = x - 32;
      player.pos.y = y - 32;

    }
  }

  function drawPath(x: number, y: number) {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
  }

  function touchEnd(e: TouchEvent) {
    console.log("end");
  }

  function touchMove(e: TouchEvent) {
    e.preventDefault();
    console.log("start", e.changedTouches);

    const touches = e.changedTouches;
    for (let i = 0; i < touches.length; i++) {
      const touch = touches[i];
      const x = touch.pageX - canvas.offsetLeft;
      const y = touch.pageY - canvas.offsetTop;

      // drawPath(x, y);
      player.pos.x = x - 32;
      player.pos.y = y - 32;
    }
  }

  function touchCancel(e: TouchEvent) {
    console.log("cancel");
  }
  
}

document.addEventListener("DOMContentLoaded", setup);
