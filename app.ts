import lib from "./pop/index";
import Texture from "./pop/Texture";
import spaceshipImage from './res/Images/spaceship.png';
const { Container, Text, CanvasRenderer, KeyControls } = lib;

let lastTimeStamp = 0; // will be total
let delta = 0; // 1s/60 60FPS

/** Renderer */
const width = 640;
const height = 480;
const renderer = new CanvasRenderer(width, height);
(document.querySelector("#board") as HTMLElement).appendChild(renderer.view);

/**control */
const control = new KeyControls();

/**Objects */
const scene = new Container();
console.log(scene);
const message = new Text("Love you", {
  font: "40pt monospace",
  fill: "indigo",
  align: "center",
});

const texture = new Texture(spaceshipImage)
console.log(texture.image);

document.body.append(texture.image);


message.pos.x = renderer.w / 2;
message.pos.y = renderer.h / 2;
message.update = function(delta: number, t: number) {
  this.pos.x -= 50 * delta;
  const textWidth = renderer.ctx.measureText('Love you').width
  if (this.pos.x < -textWidth) {
    this.pos.x = width + textWidth;
  }
}

scene.add(message);

function loop(ellapsedTime: number) {
  requestAnimationFrame(loop);

  delta = (ellapsedTime - lastTimeStamp) * 0.001; // will sresult in 0.016666s
  lastTimeStamp = ellapsedTime;



  scene.update(delta, lastTimeStamp);
  renderer.render(scene);
}

requestAnimationFrame(loop);