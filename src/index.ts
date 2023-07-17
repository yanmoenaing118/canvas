import KeyControls from "./KeyControls";
import Player from "./Player";
import Canvas from "./Renderer";
import { HEIGHT, MAX_DELTA, WIDTH } from "./constants";

const { ctx } = new Canvas();
const controls = new KeyControls();


let lastTime = 0;
let dt = MAX_DELTA;

const player = new Player(controls);

function loop(ellapsed: number) {


    dt = (ellapsed - lastTime) * 0.001;
    lastTime = ellapsed;

    ctx.clearRect(0,0,WIDTH, HEIGHT);


    player.render(ctx);
    player.update(dt);


    requestAnimationFrame(loop)
}


requestAnimationFrame(loop);