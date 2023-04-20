import lib from "./pop/index";
import Sprite from "./pop/Sprite";
import Texture from "./pop/Texture";
import spaceshipImage from "./res/Images/spaceship.png";
import bgImage from "./res/Images/bg.png";
import bulletImage from "./res/Images/bullet.png";
import buddieImage from "./res/Images/baddie.png";
import { Position } from "./pop/Types";

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
  bullet: new Texture(bulletImage),
  buddie: new Texture(buddieImage),
};

const player = new Sprite(textures.spaceship);
const playerSize = 30;
const speed = 1500;

let scoreAmount = 0;
let gameOver = false;

let lastShot = 0;
let lastSpwan = 0;
let spwanSpeed = 1;

const bullets = new Container();
const buddies = new Container();

const score = new Text("Score: ", {
  font: "20px sans-serif",
  fill: "red",
  align: "center",
});

score.pos.x = width / 2;
score.pos.y = height - 50;

player.update = function (dt, t, container) {
  if (control.y) this.pos.y += control.y * speed * dt;
  if (control.x) this.pos.x += control.x * speed * dt;

  this.pos.y = Math.min(Math.max(this.pos.y, 0), height - playerSize);
  this.pos.x = Math.min(Math.max(this.pos.x, 0), width - playerSize);

  if (control.action && t - lastShot > 0.17) {
    lastShot = t;
    firebullet({ x: this.pos.x + 24, y: this.pos.y + 10 });
  }
};

function firebullet(pos: Position) {
  const bullet = new Sprite(textures.bullet);
  bullet.pos.x = pos.x;
  bullet.pos.y = pos.y;
  bullet.update = function (delta, t) {
    bullet.pos.x += delta * 400;
    if (bullet.pos.x > width + 20) {
      bullet.dead = true;
    }
  };

  bullets.add(bullet);
}

function spwanBuddie(x: number, y: number, speed: number) {
  const buddie = new Sprite(textures.buddie);
  buddie.pos.x = x;
  buddie.pos.y = y;
  buddie.update = (dt: number, t: number) => {
    buddie.pos.x += speed * dt;
    if (buddie.pos.x < -32) {
      buddie.dead = true;
    }
  };

  buddies.add(buddie);
}

function doGameOver() {
  const gameOverMessage = new Text("Game Over", {
    font: "30pt sans-serif",
    fill: "#8B8994",
    align: "center"
  });
  gameOverMessage.pos.x = w / 2;
  gameOverMessage.pos.y = 120;
  scene.add(gameOverMessage);
  scene.remove(player);
  gameOver = true;
}
scene.add(new Sprite(textures.background));
scene.add(player);
scene.add(bullets);
scene.add(buddies);
scene.add(score);
function loop(ellapsedTime: number) {
  requestAnimationFrame(loop);

  delta = (ellapsedTime - lastTimeStamp) * 0.001; // will sresult in 0.016666s
  lastTimeStamp = ellapsedTime;

  if (ellapsedTime - lastSpwan > spwanSpeed) {
    lastSpwan = ellapsedTime;
    const x = width;
    const y = Math.random() * height + 60;
    const speed = -100 - Math.random() * Math.random() * 100;
    spwanBuddie(x, y, speed);
    spwanSpeed = Math.random() * 500;
  }

  buddies.children.forEach((baddie: Sprite) => {
    bullets.children.forEach((bullet: Sprite) => {
      const dx = baddie.pos.x + 16 - (bullet.pos.x + 8);
      const dy = baddie.pos.y + 16 - (bullet.pos.y + 8);
      if (Math.sqrt(dx * dx + dy * dy) < 24) {
        // A hit!
        bullet.dead = true;
        baddie.dead = true;
        scoreAmount += Math.floor(ellapsedTime);
      }
    });
  });

  scene.update(delta, ellapsedTime); // update a bit
  renderer.render(scene); // render everything which is just been updated
}

requestAnimationFrame(loop);
