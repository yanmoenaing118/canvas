import Girl from "./Girl";
import KeyControls from "./KeysControl";
import Soldier from "./Soldier";
import Spider from "./Spider";
import Texture from "./Texture";
import math from "./math";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;
context.imageSmoothingEnabled = true;

const w = 920;
const h = 480;

canvas.width = w;
canvas.height = h;

let dt = 1 / 60;
let time = 0;
const control = new KeyControls();
/**Background */
const bg = new Texture("./assets/pyramid.jpg");
function drawBg() {
  context.save();
  context.drawImage(bg.img, 0, 0, w, h);
  context.restore();
}

/**Girl start */
const girl = new Girl();
girl.scale.x = 0.15;
girl.scale.y = 0.15;
girl.w = 1078 * girl.scale.x;
girl.h = 2089 * girl.scale.y;
girl.pos.y = h - girl.h;
function drawGirl() {
  context.save();
  context.fillStyle = "pink";
  // context.fillRect(girl.pos.x, 0, girl.w, h);
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
function drawSoldier() {
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
const spiders: Spider[] = [];

function createSpiders() {
  for (let i = 0; i < 10; i++) {
    const spider = new Spider();
    spider.pos.x = w - 64;
    spider.pos.y = math.rand(h);
    spider.tileH = 64;
    spider.tileW = 64;
    spider.frame.y = 3;
    spiders.push(spider);
  }
}
createSpiders();

function drawSpiders() {
  for (let i = 0; i < spiders.length; i++) {
    const spider = spiders[i];
    context.restore();
    context.save();
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
  }
}

function updateSpiders(dt: number, t: number) {
  spiders.forEach((spider) => {
    spider.update(dt, t);
  });
}
/** Spiders End */

function run(ellapsedTime: number) {
  dt = (ellapsedTime - time) * 0.001;
  time = ellapsedTime; // to seconds
  if (control.y) {
    soldier.pos.y += soldier.speed * dt * control.y;
  }

  // drawSpider();

  /**
   * update entities by self
   */
  soldier.update(dt, ellapsedTime * 0.001);
  updateSpiders(dt, ellapsedTime * 0.001);

  /**
   * render entites
   */
  drawBg();
  drawGirl();
  drawSoldier();
  drawSpiders();

  requestAnimationFrame(run);
}

requestAnimationFrame(run);
