import KeyControls from "./KeyControls";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
const { width: w, height: h } = canvas;

const controls = new KeyControls();

function loop() {

    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,w,h);

    ctx.save();
    ctx.fillStyle = 'pink';
    ctx.textAlign = 'center';
    ctx.fillText(`Key: ${JSON.stringify(controls.keys)}`, w/2,h/2)
    ctx.restore();
    requestAnimationFrame(loop);

}

requestAnimationFrame(loop);


