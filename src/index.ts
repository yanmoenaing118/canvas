function setup() {
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);

  canvas.style.border = "1px solid black";

  canvas.width = 600;
  canvas.height = 400;

  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  canvas.addEventListener("touchstart", touchStart);
  canvas.addEventListener("touchend", touchEnd);
  canvas.addEventListener('touchmove', touchMove);
  canvas.addEventListener('touchcancel', touchCancel);

  function touchStart(e: TouchEvent) {
    e.preventDefault();
    console.log('start', e.changedTouches);

    const touches  = e.changedTouches;
    for(let i = 0; i < touches.length; i++ ){
      const touch = touches[i];
      const x = touch.pageX;
      const y = touch.pageY;

      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.arc(x,y,4,0, Math.PI * 2, false);
      ctx.fill();
    }
  }

  function touchEnd(e: TouchEvent) {
    console.log('end');
  }


  function touchMove(e: TouchEvent){
    console.log('moving')
  }

  function touchCancel(e: TouchEvent){
    console.log('cancel');
  }
}

document.addEventListener('DOMContentLoaded', setup)
