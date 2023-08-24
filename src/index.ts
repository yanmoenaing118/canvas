import Bullet from "./Bullet";
import Girl from "./Girl";
import KeyControls from "./KeysControl";
import Soldier from "./Soldier";
import Spider from "./Spider";
import math from "./math";
import { clamp, hasCollide } from "./utils";
import Heart from "./Heart";
import { girlH, girlImages, girlW, h, w } from "./constants";
import Sound from "./Sound";
import Score from "./Score";
import GameOver from "./GameOver";
import Background from "./Background";


const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;
context.imageSmoothingEnabled = true;

canvas.width = w;
canvas.height = h;
const dpr = window.devicePixelRatio;
const rect = canvas.getBoundingClientRect();
canvas.width = rect.width * dpr;
canvas.height = rect.height * dpr;
context.scale(dpr, dpr);
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
const bg = new Background();

/**Girl start */
const girls: Girl[] = [];
const girly = h / 2;
(function createGirls() {
  girlImages.forEach((url) => {
    const girl = new Girl(url);
    girl.pos.y = girly;
    girls.push(girl);
  });
})();
// console.log(girls);
let girlIndex = 0;
let girl: Girl = girls[girlIndex];

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
/** Soldier End */

/** Spiders Start*/
let spiders: Spider[] = [];
let lastSpwanTime = 0;
let spwanRate = 0.04;
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
    spider.render(context);
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
let shotRate = 0.04 ;
let bullets: Bullet[] = [];
const gunSound = new Sound("./assets/AK-47-sound.wav");
function createBullet() {
  const bullet = new Bullet();
  const bullet2 = new Bullet();
  bullet.pos.x = soldier.pos.x + soldier.tileW + 16;
  bullet2.pos.x = soldier.pos.x + soldier.tileW + 16;
  bullet.pos.y = soldier.pos.y + 47;
  bullet2.pos.y = soldier.pos.y ;
  bullets.push(bullet);
  bullets.push(bullet2);
}

function renderBullets() {
  bullets.forEach((bullet) => {
    bullet.render(context);
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
    life.push(heart);
  }
})();
function updateLife() {
  noOfLife = Math.ceil(totalHealtAmount / healthPerHeart);
  life = life.filter((l) => !l.dead);
}
function renderLife() {
  life.forEach((l) => {
    l.render(context);
  });
}

function checkCollision() {
  bullets.forEach((bullet) => {
    spiders.forEach((spider) => {
      if (hasCollide(bullet, spider)) {
        spider.life--;
        if(spider.life < 0) {
          spider.dead = true;
        totalScore += 1;

        }
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
const score = new Score("Total Kill: 0");

function renderGameOver() {
  if (noOfLife <= 0) {
    new GameOver(score).render(context);
    isGameOver = true;
  }
}

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
    sound.setAttribute("src", "./assets/gun-sound-1.wav");
    sound.loop = false;
    sound.volume = 0.1;
    sound.play();
  } else {
    sound = document.createElement("audio");
    sound.setAttribute("src", "./assets/gun-sound-1.wav");
    sound.volume = 0.1;
    sound.play();
    sounds.push(sound);
  }
}

/** GAME LOOP starts here */
function run(ellapsedTime: number) {
  dt = (ellapsedTime - time) * 0.001;
  time = ellapsedTime; // to seconds
  second = time * 0.001;
  if (control.y && !isGameOver) {
    const dy = soldier.pos.y + soldier.speed * dt * control.y;
    soldier.pos.y = Math.max(0, Math.min(h - 128, dy));
  }

  if (control.x && !isGameOver) {
    const dx = soldier.pos.x + soldier.speed * dt * control.x;
    soldier.pos.x = Math.max(0, Math.min(h - 128, dx));
  }

  lastShotFrame += dt;
  if (lastShotFrame > shotRate && control.action && !isGameOver) {
    createBullet();
    soldier.frame.x = 1;
    lastShotFrame = 0;
    playSound();
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
  if (control.action) {
    soldier.update(dt, second);
  } else {
    soldier.frame.x = 0;
  }
  updateSpiders(dt, second);
  updateBullets(dt, second);
  updateLife();
  updateGirlIndex();
  updateControllerCircle(dt);
  updatePlayer(dt);

  /**
   * render entites
   */
  context.clearRect(0,0,canvas.width,canvas.height);
  bg.render(context);

  soldier.render(context);
  girl.render(context);
  if (!isGameOver) {
    renderSpiders();
    renderBullets();
  }
  score.render(context);
  renderLife();
 
  // drawControllerCircle();
  drawPlayer();
  // drawControlLine();
  requestAnimationFrame(run);
  renderGameOver();
}

requestAnimationFrame(run);

const controllerCircle = {
  r: 50,
  x: 100,
  y: h - 80,
  headPoint: {
    x: 0,
    y: 0,
  },
  speedScale: 0.4,
};

const controllerLine = {
  length: 0,
  x: controllerCircle.x,
  y: controllerCircle.y,
  headX: 0,
  headY: 0,
};

const player = {
  x: w / 3,
  y: h / 3,
  w: 32,
  h: 40,
  dir: 0,
  speed: {
    x: 0,
    y: 0,
  },
};

function distanceBetweenPoint(x1: number, y1: number, x2: number, y2: number) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx - dy * dy);
}

function iSinsideCirlce(x: number, y: number) {
  return (
    distanceBetweenPoint(x, y, controllerCircle.x, controllerCircle.y) <
    controllerCircle.r
  );
}

function drawControllerCircle() {
  drawCircle(controllerCircle.r, controllerCircle.x, controllerCircle.y);
}

function drawControlLine() {
  context.save();
  context.translate(controllerLine.x, controllerLine.y);
  context.strokeStyle = "red";
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(controllerLine.headX, controllerLine.headY);
  context.stroke();
  context.closePath();
  context.restore();

  drawCircle(
    20,
    controllerCircle.x + controllerLine.headX,
    controllerCircle.y + controllerLine.headY
  );
}

function drawCircle(r: number, x: number, y: number) {
  context.save();
  context.translate(x, y);
  context.beginPath();
  context.strokeStyle = "green";
  context.lineWidth = 2;
  context.arc(0, 0, r, 0, Math.PI * 2);
  context.stroke();
  context.fill();
  context.closePath();
  context.restore();
}

function angle(x1: number, y1: number, x2: number, y2: number) {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.atan2(dy, dx);
}

function updateControllerCircle(dt: number) {}

function drawPlayer() {
  context.save();
  context.translate(player.x, player.y);
  context.translate(player.w / 2, player.h / 2);
  context.rotate(player.dir);
  context.translate(-player.w / 2, -player.h / 2);

  context.fillStyle = "rgba(22,0,0,0.4)";
  context.fillRect(0, 0, player.w, player.h);
  context.restore();
}

function updatePlayer(dt: number) {
  player.x += Math.cos(player.dir) * dt * player.speed.x;
  player.y += Math.sin(player.dir) * dt * player.speed.y;

  if (player.x == 0 || player.y == 0) {
    player.x = player.x;
    player.y = player.y;
  } else {
    player.x = clamp(player.x, 0, w - player.w);
    player.y = clamp(player.y, 0, h - player.h);
  }
}


canvas.addEventListener("touchend", (e) => {
  controllerLine.length = 0;
  controllerLine.headX = 0;
  controllerLine.headY = 0;
  player.speed.x = 0;
  player.speed.y = 0;
});

canvas.addEventListener("touchstart", handle_touch);
canvas.addEventListener("touchmove", handle_touch);

function handle_touch(e: TouchEvent) {
  e.preventDefault();
  const touchList = e.changedTouches;

  for (let i = 0; i < touchList.length; i++) {
    const touch = touchList[i];
    const { pageX: x1, pageY: y1 } = touch;

    const distance = distanceBetweenPoint(
      x1,
      y1,
      controllerCircle.x,
      controllerCircle.y
    );

    controllerLine.length = distance;
    controllerLine.headX = x1 - controllerCircle.x;
    controllerLine.headY = y1 - controllerCircle.y;

    controllerLine.headX = clamp(
      controllerLine.headX,
      -controllerCircle.r * controllerCircle.speedScale,
      controllerCircle.r * controllerCircle.speedScale
    );
    controllerLine.headY = clamp(
      controllerLine.headY,
      -controllerCircle.r * controllerCircle.speedScale,
      controllerCircle.r * controllerCircle.speedScale
    );

    const dir = angle(x1, y1, controllerCircle.x, controllerCircle.y);
    player.dir = dir;
    player.speed.x = 100 + Math.abs(controllerLine.headX);
    player.speed.y = 100 + Math.abs(controllerLine.headY);
  }
}
