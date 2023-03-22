import lib from "./pop/index";
import Sprite from "./pop/Sprite";
import Texture from "./pop/Texture";
import spaceshipImage from "./res/Images/spaceship.png";
import bgImage from "./res/Images/bg.png";
import bulletImage from "./res/Images/bullet.png";

const { Container, Text, CanvasRenderer, KeyControls } = lib;

let lastTimeStamp = 0; // will be total
let delta = 0; // 1s/60 60FPS

/** Renderer */
const width = 640;
const height = 300;
const renderer = new CanvasRenderer(width, height);
(document.querySelector("#board") as HTMLElement).appendChild(renderer.view);

/**control */
const control = new KeyControls();

/**Objects */
const scene = new Container();
const textures = {
  background: new Texture(bgImage),
  spaceship: new Texture(spaceshipImage),
  bullet: new Texture(bulletImage)
};

const player = new Sprite(textures.spaceship);
const playerSize = 30;
const speed = 1500;

player.update = function (dt, t) {
  
  if (control.y) this.pos.y += control.y * speed * dt;
  if (control.x) this.pos.x += control.x * speed * dt;
  
  this.pos.y = Math.min(Math.max(this.pos.y, 0), height - playerSize);
  this.pos.x = Math.min(Math.max(this.pos.x, 0), width - playerSize);


};

scene.add(new Sprite(textures.background));
scene.add(player);

console.log(scene);

function loop(ellapsedTime: number) {
  requestAnimationFrame(loop);

  delta = (ellapsedTime - lastTimeStamp) * 0.001; // will sresult in 0.016666s
  lastTimeStamp = ellapsedTime;

  scene.update(delta, lastTimeStamp); // update a bit
  renderer.render(scene); // render everything which is just been updated
}

requestAnimationFrame(loop);
