import Ball from "./Ball";
import renderUpdate from "./loop";

let ball = new Ball(16, 16, 16, 'red');

function render(ctx: CanvasRenderingContext2D) {
    ball.render(ctx);
}


function update(dt: number, t: number) {

    
}

renderUpdate(render, update)