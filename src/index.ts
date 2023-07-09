import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants";
import Cheese from "./entities/Cheese";
import Dungeon from "./entities/Dungeon";
import Mouse from "./entities/Mouse";
import Player from "./entities/Player";
import Container from "./pop/Container";
import Game from "./pop/Game";
import Rect from "./pop/Rect";
import Text from "./pop/Text";
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
const playerStatus = new Text(player.pos.x + " " + player.pos.y, {
  font: "24px Arial",
  fill: "white",
});
const bounds = entities.bounds(player);
scene.add(playerStatus);

const boundRects = dungeon.tilesAtCorners(bounds, 0, 0).map((tile) => {
  const r = scene.add(
    new Rect(tile.w, tile.h, {
      fill: "rgba(3,222,5,0.3)",
    })
  );
  r.pos.x = tile.pos.x;
  r.pos.y = tile.pos.y;
  return r;
});


player.pos.x = player.w;
player.pos.y = player.h;

const playerRect = scene.add(new Rect(player.w,player.h, {
  fill: 'white'
}))
playerRect.pos.x = player.pos.x;
playerRect.pos.y = player.pos.y; 

scene.add(player);
game.run(() => {
  const playerMapPos = dungeon.pixelToMapPosition(player.pos);
  playerStatus.text = `
    pixel: (${player.pos.x.toFixed(2)} ${player.pos.y.toFixed(2)})
    map: (${playerMapPos.x}, ${playerMapPos.y})
    `;
  
    playerRect.pos = player.pos;

  const bounds = entities.bounds(player);
  const collidingTiles = dungeon.tilesAtCorners(bounds, -48/2, -48/2);
  collidingTiles.forEach((tile, index) => {
    if (!tile) return;
    boundRects[index].pos.x = tile.pos.x;
    boundRects[index].pos.y = tile.pos.y;
  });
});
