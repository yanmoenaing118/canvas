import KeyControls from "./KeyControls";
import LevelMap from "./LevelMap";
import Player from "./Player";
import Texture from "./Texture";
import TileSprite from "./TileSprite";
import { h, w } from "./canvas";
import renderUpdate from "./loop";
import { clamp } from "./utils";

const controls = new KeyControls();
const gravity = 32;

const map = new LevelMap();
const tile = new Player();
tile.pos.x = map.playerPos.x;
tile.pos.y = map.playerPos.y;

tile.update = function (dt: number, t: number) {
  this.pos.x += controls.x * 320 * dt;
  this.pos.x = clamp(this.pos.x, 64, w - 64 * 2);

  let oy = 0;
  if (!this.jumping && controls.action) {
    this.jumping = true;
    this.vel -= 10;
  }

  if (this.jumping) {
    this.vel += dt * gravity;
    oy = this.vel;
  }

  if (this.pos.y > h - 64 * 2) {
    oy = 0;
    this.pos.y = h - 64 * 2;
    this.jumping = false;
  }

  this.pos.y += oy;
};

function render(ctx: CanvasRenderingContext2D) {
  map.render(ctx);
  tile.render(ctx);
}

function update(dt: number, t: number) {
  tile.update(dt, t);
}

renderUpdate(render, update);
