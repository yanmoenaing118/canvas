import { Texture, TileSprite } from "./Entities";
import { KeyControls } from "./KeyControls";
import { renderGrid, renderTileSprite } from "./Renderers";

const canvas = document.createElement("canvas") as HTMLCanvasElement;

document.body.appendChild(canvas);

const w = 480;
const h = 320;
const cellSize = 32;

canvas.width = w;
canvas.height = h;
const controls = new KeyControls();
export const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
let dt = 1 / 60;
let time = 0;

const texture = new Texture("./log.png");
console.log(texture);

function renderSprite(tileSprite: TileSprite) {
  ctx.save();
  ctx.translate(tileSprite.pos.x, tileSprite.pos.y);
  ctx.drawImage(
    tileSprite.texture.img,
    tileSprite.frame.x * tileSprite.tileW,
    tileSprite.frame.y * tileSprite.tileH,
    tileSprite.tileW,
    tileSprite.tileH,
    0,
    0,
    tileSprite.tileW,
    tileSprite.tileH
  );
  ctx.restore();
}

const mapW = Math.ceil(w / cellSize);
const mapH = Math.ceil(h / cellSize);

const tiles: TileSprite[] = [];

(function createMap() {
  for (let i = 0; i < mapH * mapW; i++) {
    const tileSprite = new TileSprite(texture, cellSize, cellSize);
    tileSprite.pos.x = (i % mapW) * cellSize;
    tileSprite.pos.y = Math.floor(i / mapW) * cellSize;
    tileSprite.anims.add('walk', [
      {x: Math.floor(Math.random() * 3), y: Math.floor(Math.random() * 3)},
      {x: Math.floor(Math.random() * 3), y: Math.floor(Math.random() * 3)},
      {x: Math.floor(Math.random() * 3), y: Math.floor(Math.random() * 3)},
      {x: Math.floor(Math.random() * 3), y: Math.floor(Math.random() * 3)},
      {x: Math.floor(Math.random() * 3), y: Math.floor(Math.random() * 3)},
    ],0.25)
    tileSprite.anims.play('walk')
    tiles.push(tileSprite);
  }
})();

function updateMap(dt: number) {
  tiles.forEach(tile => tile.update(dt))
}

function renderMap() {
  tiles.forEach((tile) => renderSprite(tile));
}


function loop(ellapsedTime: number) {
  dt = (ellapsedTime - time) * 0.001;
  time = ellapsedTime;
  ctx.clearRect(0, 0, w, h);

  updateMap(dt);

  renderGrid(h / cellSize, w / cellSize, cellSize, cellSize);

  renderMap();
  ctx.restore();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
