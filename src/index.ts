import Bullet from "./Bullet";
import Girl from "./Girl";
import KeyControls from "./KeysControl";
import Soldier from "./Soldier";
import Spider from "./Spider";
import Sprite from "./Sprite";
import Texture from "./Texture";
import TileSprite from "./TileSprite";
import math from "./math";
import { Position } from "./types";
import Text from "./Text";
import { hasCollide } from "./utils";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;
context.imageSmoothingEnabled = true;

const w = 1200;
const h = 480;

canvas.width = w;
canvas.height = h;

let dt = 1 / 60;
let time = 0; // in millis
let second = 0;
const control = new KeyControls();

/** Game stats */
let totalScore = 0;
let girlAge = 250;
let totalHit = 0;

/**Background */
const bg = new Texture("./assets/pyramid.jpg");
function renderBg() {
  context.save();
  context.drawImage(bg.img, 0, 0, w, h);
  context.restore();
}

/**Girl start */
const girl = new Girl();
girl.pos.y = h - girl.h;
function renderGirl() {
  context.save();
  context.fillStyle = "pink";
  context.fillRect(girl.pos.x, 0, girl.w, h);
  context.restore();
  context.save();
  context.translate(girl.pos.x, girl.pos.y);
  context.scale(girl.scale.x, girl.scale.y);
  context.drawImage(girl.texture.img, girl.pos.x, girl.pos.y);
  context.restore();
}
/** Girl End */

/** Soldier Start */
const soldier = new Soldier();
soldier.pos.x = girl.w;
function renderSoldier() {
  context.save();
  context.translate(soldier.pos.x, soldier.pos.y);
  context.drawImage(
    soldier.texture.img,
    soldier.tileH * soldier.frame.x,
    soldier.tileH * soldier.frame.y,
    soldier.tileW,
    soldier.tileH,
    0,
    0,
    soldier.tileW,
    soldier.tileH
  );
  context.restore();
}
/** Soldier End */

/** Spiders Start*/
let spiders: Spider[] = [];
let lastSpwanTime = 0;
let spwanRate = 0.07;
function createSpiders() {
  for (let i = 0; i < 1; i++) {
    const spider = new Spider();
    spider.pos.x = w - 64;
    spider.pos.y = math.rand(h - girl.h, h - spider.h - soldier.tileH / 2);
    spider.tileH = 64;
    spider.tileW = 64;
    spider.frame.y = 3;
    spiders.push(spider);
  }
}
createSpiders();

function renderSpiders() {
  spiders.forEach((spider) => {
    context.restore();
    context.save();
    context.fillStyle = "red";
    context.translate(spider.pos.x, spider.pos.y);
    // context.translate(spider.anchor.x, spider.anchor.y);
    context.scale(spider.scale.x, spider.scale.y);
    // context.strokeRec t(0, 0, spider.w, spider.h);
    context.drawImage(
      spider.texture.img,
      spider.tileH * spider.frame.x,
      spider.tileH * spider.frame.y,
      spider.tileW,
      spider.tileH,
      0,
      0,
      spider.tileW,
      spider.tileH
    );
    context.restore();
  });
}

function updateSpiders(dt: number, t: number) {
  spiders = spiders.filter((spider) => !spider.dead);
  spiders.forEach((spider) => {
    spider.update(dt, t);
  });
}
/** Spiders End */

// Bullet Starts
let lastShotFrame = 0;
let shotRate = 0.05;
const bullets: Bullet[] = [];
function createBullet() {
  const bullet = new Bullet();
  bullet.pos.x = soldier.pos.x + soldier.tileW + 16;
  bullet.pos.y = soldier.pos.y + 47;
  bullets.push(bullet);
}

function renderBullets() {
  bullets.forEach((bullet) => {
    context.save();
    context.translate(bullet.pos.x, bullet.pos.y);
    context.rotate(Math.PI / 2);
    context.drawImage(bullet.texture.img, 0, 0);
    context.restore();
  });
}

function updateBullets(dt: number, t: number) {
  bullets.forEach((bullet) => {
    bullet.update(dt, t);
  });
}
// Bullets end

// collisions
function checkCollision() {
  bullets.forEach((bullet) => {
    spiders.forEach((spider) => {
      if(hasCollide(bullet, spider)) {
        spider.dead = true;
        totalScore += 1;
      }
    });
  });
}

function checkGirlHit() {
  spiders.forEach(spider => {
    if(spider.pos.x < girl.pos.x + girl.w) {
      if(hasCollide(spider, girl,100)) {
        spider.speed = 0;
      }

    }
  })
}

// score text
const score = new Text("Total Kill: 0");
score.style.color = 'white';
function renderScore() {
  context.save();
  context.translate(w - score.width(context) * 2 - 1,0);
  context.fillStyle = 'black';
  context.fillRect(0,0,score.width(context) * 2,30);
  context.restore();

  context.save();
  context.font = score.style.font as string;
  context.fillStyle = score.style.color as string;
  context.translate(w - score.width(context) - 4,20);
  context.fillText(score.text, 0, 0);
  
  context.restore();

}

renderScore();
console.log(score)
function run(ellapsedTime: number) {
  dt = (ellapsedTime - time) * 0.001;
  time = ellapsedTime; // to seconds
  second = time * 0.001;
  if (control.y) {
    const dy = soldier.pos.y + soldier.speed * dt * control.y;
    soldier.pos.y = Math.max(0, Math.min(h - 128, dy));
  }

  lastShotFrame += dt;
  if (lastShotFrame > shotRate && control.action) {
    createBullet();
    lastShotFrame = 0;
  }

  lastSpwanTime += dt;
  if (lastSpwanTime > spwanRate) {
    createSpiders();
    lastSpwanTime = 0;
    const rate = Math.random() * 0.5;
    spwanRate = rate > 0.15 ? 0.15 : rate;
  }

  // drawSpider();
  checkCollision();
  checkGirlHit();
  score.text = `Total Kill: ${totalScore}`;

  /**
   * update entities by self
   */
  if(control.y) {
    soldier.update(dt, second);
  }
  updateSpiders(dt, second);
  updateBullets(dt, second);

  /**
   * render entites
   */
  renderBg();
  renderGirl();
  renderSoldier();
  renderSpiders();
  renderBullets();
  renderScore();
  requestAnimationFrame(run);
}

requestAnimationFrame(run);
