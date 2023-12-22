import Circle from "./Circle";
import renderGrid from "./Grid";
import Line from "./Line";
import Vec from "./Vec";
import Walker from "./Walker";
import { canvas, h, w } from "./canvas";
import renderUpdate from "./loop";
import randomColor from "randomcolor";




const line = new Line();
let mouseVec = new Vec(0,0);

line.startPoint.set(32 * 10, 32 * 10);

canvas.addEventListener('mousemove', (e) => {
    mouseVec.set(e.pageX, e.pageY);
    mouseVec.sub(line.startPoint);
    line.endPoint.set(mouseVec.x, mouseVec.y);
})

function update(dt: number, t: number) {
    
}

function render(ctx: CanvasRenderingContext2D) {
    line.render(ctx);
    renderGrid(ctx, w, h, 32);
}

renderUpdate(render, update, true);
