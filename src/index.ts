import { Texture, TileSprite } from "./Entities";
import { KeyControls } from "./KeyControls";
import { renderTileSprite } from "./Renderers";

const canvas = document.createElement("canvas") as HTMLCanvasElement;

document.body.appendChild(canvas);

const w = 480;
const h = 360;

canvas.width = w;
canvas.height = h;
const controls = new KeyControls();
export const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
let dt = 1 / 60;
let time = 0;

const texture = new Texture("./spider10.png");
const spider = new TileSprite(texture, 64, 64);

spider.anims.add(
  "left",
  [
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
    { x: 3, y: 1 },
    { x: 4, y: 1 },
  ],
  0.1
);

spider.anims.add(
  "right",
  [
    { x: 0, y: 3 },
    { x: 1, y: 3 },
    { x: 2, y: 3 },
    { x: 3, y: 3 },
    { x: 4, y: 3 },
  ],
  0.1
);

spider.anims.add(
  "walkUp",
  [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
    { x: 4, y: 0 },
  ],
  0.1
);

spider.anims.add(
  "walkDown",
  [
    { x: 0, y: 2 },
    { x: 1, y: 2 },
    { x: 2, y: 2 },
    { x: 3, y: 2 },
    { x: 4, y: 2 },
  ],
  0.1
);

function renderSprite() {
  ctx.save();
  ctx.translate(spider.pos.x, spider.pos.y);
  ctx.drawImage(
    spider.texture.img,
    spider.frame.x * spider.tileW,
    spider.frame.y * spider.tileH,
    spider.tileW,
    spider.tileH,
    0,
    0,
    spider.tileW,
    spider.tileH
  );
  ctx.restore();
}

function loop(ellapsedTime: number) {
  dt = Math.min((ellapsedTime - time) * 0.001, 1 / 60);
  time = ellapsedTime;
  ctx.clearRect(0, 0, w, h);
  ctx.fillRect(0, 0, w, h);
  ctx.save();

  if (controls.x < 0) {
    spider.anims.play("left");
  } else if (controls.x > 0) {
    spider.anims.play("right");
  } else if (controls.y > 0) {
    spider.anims.play("walkDown");
  } else if (controls.y < 0) {
    spider.anims.play("walkUp");
  }
 

  spider.update(dt);

  renderSprite();

  ctx.restore();

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
