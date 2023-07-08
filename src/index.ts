import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants";
import Cheese from "./entities/Cheese";
import Dungeon from "./entities/Dungeon";
import Mouse from "./entities/Mouse";
import Player from "./entities/Player";
import Container from "./pop/Container";
import Game from "./pop/Game";
import Rect from "./pop/Rect";
import pop from "./pop/index";
import entities from "./pop/utils/entities";
import math from "./pop/utils/math";
const { KeyControls } = pop;

const controls = new KeyControls();
const w = CANVAS_WIDTH;
const h = CANVAS_HEIGHT;
const game = new Game(w, h);
const { scene } = game;



const dungeon = scene.add(new Dungeon());
const player = new Player(controls);
const bounds = entities.bounds(player);

const boundRects = dungeon.tilesAtCorners(bounds, 0, 0).map((tile) => {
  const r = scene.add(new Rect(tile.w, tile.h, {
    fill: 'rgba(3,55,5,0.3)'
  }));
  r.pos.x = tile.pos.x;
  r.pos.y = tile.pos.y;
  return r;
});

scene.add(player);

player.pos.x = player.w;
player.pos.y = player.h;





// console.log(player.pos);
// console.log(bounds);
// console.log(collidingTiles.map((t) => t.frame));

game.run(() => {
  const bounds = entities.bounds(player);
  const collidingTiles = dungeon.tilesAtCorners(bounds, -player.w * 0.4, -player.h * 0.4);
  collidingTiles.forEach((tile, index) => {
    if(!tile) return;
    boundRects[index].pos.x = tile.pos.x;
    boundRects[index].pos.y = tile.pos.y;
  })
});
