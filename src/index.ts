import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants";
import Dungeon from "./entities/Dungeon";
import Player from "./entities/Player";
import Game from "./pop/Game";
import Rect from "./pop/Rect";
import Text from "./pop/Text";
import pop from "./pop/index";
import entities from "./pop/utils/entities";
const { KeyControls } = pop;

const controls = new KeyControls();
const w = CANVAS_WIDTH;
const h = CANVAS_HEIGHT;
const game = new Game(w, h);
const { scene } = game;

const dungeon = scene.add(new Dungeon());
const player = new Player(controls, dungeon);
const playerStatus = new Text(player.pos.x + " " + player.pos.y, {
  font: "24px Arial",
  fill: "white",
});
scene.add(playerStatus);





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
  
});
