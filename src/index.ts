import { Texture, TileSprite } from "./Entities";
import { KeyControls } from "./KeyControls";
import { renderGrid, renderTileSprite } from "./Renderers";
import { MAX_FRAME } from "./constants";
import { clamp } from "./utils";

const canvas = document.createElement("canvas") as HTMLCanvasElement;

document.body.appendChild(canvas);

const w = 64 * 10;
const h = 64 * 8;
const cellSize = 64;

canvas.width = w;
canvas.height = h;
const controls = new KeyControls();
export const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
let dt = 1 / 60;
let time = 0;

const texture = new Texture("./spider10.png");
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
  for (let i = 0; i < 1; i++) {
    const tileSprite = new TileSprite(texture, cellSize, cellSize);
    tileSprite.pos.x = (i % mapW) * cellSize;
    tileSprite.pos.y = Math.floor(i / mapW) * cellSize;
    tileSprite.anims.add(
      "walk",
      [
        { x: Math.floor(Math.random() * 3), y: Math.floor(Math.random() * 3) },
        { x: Math.floor(Math.random() * 3), y: Math.floor(Math.random() * 3) },
        { x: Math.floor(Math.random() * 3), y: Math.floor(Math.random() * 3) },
        { x: Math.floor(Math.random() * 3), y: Math.floor(Math.random() * 3) },
        { x: Math.floor(Math.random() * 3), y: Math.floor(Math.random() * 3) },
      ],
      0.08
    );
    // tileSprite.anims.play("walk");
    tiles.push(tileSprite);
  }
})();

function updateMap(dt: number) {
  tiles.forEach((tile) => {
    tile.update(dt);
    const { x, y } = tile.dir;

    if ((tile.canMove -= dt) <= 0) {
      tile.canMove = tile.speed;
      if (controls.x && controls.x != x) {
        tile.dir.x = controls.x;
        tile.dir.y = 0;
        // tile.pos.y = Math.round(tile.pos.y / cellSize) * cellSize;
      } else if (controls.y && controls.y != y) {
        tile.dir.y = controls.y;
        tile.dir.x = 0;
        // tile.pos.x = Math.round(tile.pos.x / cellSize) * cellSize;
      }
    }

    tile.pos.x += tile.dir.x * (cellSize / tile.speed) * dt;
    tile.pos.y += tile.dir.y * (cellSize / tile.speed) * dt;

    tile.pos.x = clamp(tile.pos.x, 0, w - cellSize);
    tile.pos.y = clamp(tile.pos.y, 0, h - cellSize);
  });
}

function renderMap() {
  tiles.forEach((tile) => renderSprite(tile));
}

function loop(ellapsedTime: number) {
  dt = Math.min((ellapsedTime - time) * 0.001, MAX_FRAME);
  time = ellapsedTime;
  ctx.clearRect(0, 0, w, h);

  updateMap(dt);

  renderGrid(h / cellSize, w / cellSize, cellSize, cellSize);
  renderMap();

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
