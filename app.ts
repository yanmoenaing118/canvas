import lib from "./pop/index";
import Sprite from "./pop/Sprite";
import Texture from "./pop/Texture";
import spaceshipImage from "./res/Images/spaceship.png";
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

const message = new Text("Love you", {
  font: "40pt monospace",
  fill: "indigo",
  align: "center",
});

const texture = new Texture(spaceshipImage);
const sprites = new Container();


for (let i = 0; i < 50; i++) {
  const ship = new Sprite(texture);
  ship.pos.x = Math.random() * width;
  ship.pos.y = Math.max(30, Math.random() * height - 30);
  const speed = Math.random() * 300 + 50;
  ship.update = (delta, time) => {
   
    if (ship.pos.x >= width) {
      ship.pos.x = Math.random() * 25;
    } else if (control.x) {
      ship.pos.x += speed * delta * control.x;
    } else {
      ship.pos.x += speed * delta;
    }
  };
  scene.add(ship);
}

message.pos.x = renderer.w / 2;
message.pos.y = renderer.h / 2;
message.update = function (delta: number, t: number) {
  this.pos.x -= 50 * delta;
  const textWidth = renderer.ctx.measureText("Love you").width;
  if (this.pos.x < -textWidth) {
    this.pos.x = width + textWidth;
  }
};

scene.add(message);

function loop(ellapsedTime: number) {
  requestAnimationFrame(loop);

  delta = (ellapsedTime - lastTimeStamp) * 0.001; // will sresult in 0.016666s
  lastTimeStamp = ellapsedTime;

  scene.update(delta, lastTimeStamp); // update a bit
  renderer.render(scene); // render everything which is just been updated
}

requestAnimationFrame(loop);
