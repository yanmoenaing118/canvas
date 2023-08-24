import Bullet from "./Bullet";
import Girl from "./Girl";
import KeyControls from "./KeysControl";
import Soldier from "./Soldier";
import Spider from "./Spider";
import Texture from "./Texture";
import math from "./math";
import Text from "./Text";
import { hasCollide } from "./utils";
import Heart from "./Heart";
import { girlImages, h, w } from "./constants";
import Sprite from "./Sprite";
import Sound from "./Sound";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;
context.imageSmoothingEnabled = true;

canvas.width = w;
canvas.height = h;

// Get the DPR and size of the canvas
const dpr = window.devicePixelRatio;
const rect = canvas.getBoundingClientRect();

// Set the "actual" size of the canvas
canvas.width = rect.width * dpr;
canvas.height = rect.height * dpr;

// Scale the context to ensure correct drawing operations
context.scale(dpr, dpr);

// Set the "drawn" size of the canvas
canvas.style.width = `${rect.width}px`;
canvas.style.height = `${rect.height}px`;

let dt = 1 / 60;
let time = 0; // in millis
let second = 0;
const control = new KeyControls();

/** Game stats */
let totalScore = 0;
let noOfLife = 5; // in second
let healthPerHeart = 400;
let totalHealtAmount = noOfLife * healthPerHeart;
let totalBiteSipders = 0; // number of spiders that are biting the Girl
let hasBiteGirl = false; // to flag the Gril has been bitten
let currBittenTime = 0;
let healthRate = 0.01;
let isGameOver = false;
const sounds: HTMLAudioElement[] = [];

/**Background */
const bg = new Texture("./assets/pyramid.jpg");
function renderBg() {
  context.save();
  context.drawImage(bg.img, 0, 0, w, h);
  context.restore();
}

/**Girl start */
const girls: Girl[] = [];
(function createGirls() {
  girlImages.forEach((url) => {
    const girl = new Girl(url);
    girl.pos.y = Math.random() * (h - girl.h * 3) + girl.h;
    girls.push(girl);
  });
})();
// console.log(girls);
let girlIndex = 0;
let girl: Girl = girls[girlIndex];
function renderGirl() {
  context.save();
  context.fillStyle = "pink";
  // context.fillRect(girl.pos.x, 0, girl.w, h);
  context.restore();
  context.save();
  context.translate(girl.pos.x, girl.pos.y);
  // context.scale(girl.scale.x, girl.scale.y);
  context.drawImage(girl.texture.img, 0, 0);
  context.restore();
}

function updateGirlIndex() {
  // return;
  girlIndex = girls.length - noOfLife;
  if (!girls[girlIndex]) return;
  girl = girls[girlIndex];
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
    spider.pos.y = math.rand(0, h - spider.h - soldier.tileH / 2);
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
    context.scale(spider.scale.x, spider.scale.y);
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
let shotRate = 0.1 ;
let bullets: Bullet[] = [];
const gunSound = new Sound("./assets/AK-47-sound.wav");
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
  bullets = bullets.filter((bullet) => !bullet.dead);
  bullets.forEach((bullet) => {
    bullet.update(dt, t);
  });
}
// Bullets end

// Girl Life start
let life: Heart[] = [];
(function createLife() {
  for (let i = 0; i < noOfLife; i++) {
    const heart = new Heart();
    heart.pos.x = i * heart.w + (i * heart.w) / 2;
    // heart.pos.x = i *
    life.push(heart);
  }
})();
function updateLife() {
  noOfLife = Math.ceil(totalHealtAmount / healthPerHeart);
  life = life.filter((l) => !l.dead);
}
function renderLife() {
  life.forEach((l) => {
    context.save();
    context.translate(l.pos.x, l.pos.y);
    context.scale(0.85, 0.85);
    context.drawImage(l.texture.img, 0, 0);
    context.restore();
  });
}

// Girl life end

// collisions
function checkCollision() {
  bullets.forEach((bullet) => {
    spiders.forEach((spider) => {
      if (hasCollide(bullet, spider)) {
        spider.dead = true;
        totalScore += 1;
      }
    });
  });
}

function checkGirlHit() {
  spiders.forEach((spider) => {
    if (hasCollide(spider, girl, 0)) {
      spider.speed = 0;
    }
  });
}

function getNoOfBiteSpiders(): number {
  return spiders.filter((spider) => spider.bite).length;
}

/**
 *
 * @param time in seconds
 */
function updateGirlHealth(time: number) {
  currBittenTime += dt;
  if (currBittenTime >= healthRate) {
    const damage = healthRate + totalBiteSipders * 0.1;
    totalHealtAmount -= damage;
    const heartIndex = Math.ceil(totalHealtAmount / healthPerHeart);
    if (life[heartIndex]) {
      life[heartIndex].dead = true;
    }
    currBittenTime = 0;
  }
}

// score text
const score = new Text("Total Kill: 0");
score.style.color = "white";
function renderScore() {
  context.save();
  context.translate(w - score.width(context) * 2 - 1, 0);
  context.fillStyle = "black";
  context.fillRect(0, 0, score.width(context) * 2, 30);
  context.restore();

  context.save();
  context.font = score.style.font as string;
  context.fillStyle = score.style.color as string;
  context.translate(w - score.width(context) - 4, 20);
  context.fillText(score.text, 0, 0);

  context.restore();
}

renderScore();

function renderGameOver() {
  if (noOfLife <= 0) {
    doGameOver();
  }
  // doGameOver();
}

function doGameOver() {
  isGameOver = true;
  const over = new Text("Game Over!");
  context.globalAlpha = 0.65;
  context.save();
  context.translate(0, 0);
  context.fillStyle = "black";
  context.fillRect(0, 0, w, h);
  context.restore();

  context.save();
  context.fillStyle = "black";
  context.font = "68px monospace";
  context.strokeStyle = "white";
  context.lineWidth = 3;
  context.translate(w / 2 - over.width(context) / 2.25, h / 2 - 34);
  context.fillText(over.text, 0, 0);
  context.strokeText(over.text, 0, 0);
  context.restore();

  context.save();
  context.fillStyle = "white";
  context.font = "24px monospace";
  context.strokeStyle = "white";
  context.translate(w / 2 - over.width(context) / 2.25, h / 2 + 34);
  context.fillText(score.text, 0, 0);
  context.restore();

  context.save();
}

const test = new Sprite(new Texture(girlImages[0]));

console.log(test);

function playSound() {
  let soundFound = false;
  let idx: number | undefined;
  let sound: HTMLAudioElement;
  sounds.forEach((el, i) => {
    if (el.ended) {
      soundFound = true;
      idx = i;
      return;
    }
  });

  if (soundFound && idx) {
    sound = sounds[idx];
    sound.setAttribute("src", "./assets/shot_03.ogg");
    sound.loop = false;
    sound.volume = .5;
    sound.play();
  } else {
    sound = document.createElement("audio");
    sound.setAttribute("src", "./assets/shot_03.ogg");
    sound.volume = .5;
    sound.play();
    sounds.push(sound);
  }
}

/** GAME LOOP starts here */
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
    playSound();

  }

  if (control.action) {
  }
  lastSpwanTime += dt;
  if (lastSpwanTime > spwanRate) {
    createSpiders();
    lastSpwanTime = 0;
    const rate = Math.random() * 0.5;
    spwanRate = rate > 0.15 ? 0.15 : rate;
    // spwanRate = 1;
  }

  // drawSpider();
  checkCollision();
  checkGirlHit();
  score.text = `Total Kill: ${totalScore}`;

  totalBiteSipders = getNoOfBiteSpiders();
  hasBiteGirl = totalBiteSipders > 0;

  /**
   * update entities by self
   */
  if (hasBiteGirl) {
    updateGirlHealth(second);
  }
  if (control.y) {
    soldier.update(dt, second);
  }
  updateSpiders(dt, second);
  updateBullets(dt, second);
  updateLife();
  updateGirlIndex();

  /**
   * render entites
   */
  renderBg();

  renderSoldier();
  if (!isGameOver) {
    renderSpiders();
    renderBullets();
  }
  renderScore();
  renderLife();
  renderGirl();
  renderGameOver();

  requestAnimationFrame(run);
}

requestAnimationFrame(run);
