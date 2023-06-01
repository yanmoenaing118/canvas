import { Spider, Texture, TileSprite } from "./Entities";
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

const spider = new Spider(new Texture("./spider10.png"), 64, 64, 0.2);
spider.pos.x = w / 2;

spider.add("idle", [{ x: 0, y: 0 }]);

spider.add("walkLeft", [
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: 2, y: 1 },
  { x: 3, y: 1 },
  { x: 4, y: 1 },
]);

spider.add("walkRight", [
  { x: 0, y: 3 },
  { x: 1, y: 3 },
  { x: 2, y: 3 },
  { x: 3, y: 3 },
  { x: 4, y: 3 },
]);

spider.play("idle");
// spider.play("")

function loop(ellapsedTime: number) {
  dt = (ellapsedTime - time) * 0.001;
  time = ellapsedTime;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, w, h);
  
  spider.scale.x = controls.x == 0 ? 1 : controls.x;
  spider.anchor.x = spider.scale.x == 1 ? 0 : -64;

  spider.pos.x += dt * 20;


  spider.update(dt);

  renderTileSprite(spider);
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
