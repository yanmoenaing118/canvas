import KeyControls from "./KeyControls";
import LevelMap from "./LevelMap";
import Player from "./Player";
import RectLevel from "./RectLevel";
import Texture from "./Texture";
import TileSprite from "./TileSprite";
import { h, w } from "./canvas";
import renderUpdate from "./loop";
import { clamp } from "./utils";

const controls = new KeyControls();

const map = new RectLevel(w, h);
const player = new Player();
player.pos = map.spwans["player"];

player.update = function (dt) {
  const mx = dt * controls.x * this.speed;
  const my = dt * controls.y * this.speed;

  this.pos.x += mx;
  this.pos.y += my;

  const rect = map.tileAtPixelPosition(this.pos.x, this.pos.y);

  this.pos.x = clamp(this.pos.x, 0, w - this.w);
  this.pos.y = clamp(this.pos.y, 0, h - this.h * 2);
};

function render(ctx: CanvasRenderingContext2D) {
  map.render(ctx);
  player.render(ctx);
}

function update(dt: number, t: number) {
  player.update(dt, t);
}

renderUpdate(render, update);
