import renderGrid from "./Grid";
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

  const tiles = map.tilesAtCorner(
    {
      x: this.pos.x,
      y: this.pos.y,
      w: this.w,
      h: this.h,
    },
    mx,
    my
  );

  console.log(JSON.stringify(tiles));

  this.pos.x += mx;
  this.pos.y += my;

  this.pos.x = clamp(this.pos.x, 0, w - this.w);
  this.pos.y = clamp(this.pos.y, 0, h - this.h * 2);
};

function render(ctx: CanvasRenderingContext2D) {
  map.render(ctx);
  player.render(ctx);
  renderGrid(ctx, w, h, 64);
}

function update(dt: number, t: number) {
  player.update(dt, t);
}

renderUpdate(render, update);
