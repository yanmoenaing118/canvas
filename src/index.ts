import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants";
import Bat from "./entities/Bat";
import Dungeon from "./entities/Dungeon";
import Player from "./entities/Player";
import Game from "./pop/Game";
import Text from "./pop/Text";
import pop from "./pop/index";
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

for(let i = 0 ; i < 10; i++ ) {
  scene.add(new Bat());
}

playerStatus.pos.y = 25;
player.pos.x = player.w;
player.pos.y = player.h;



scene.add(playerStatus);
scene.add(player);
game.run(() => {
  const playerMapPos = dungeon.pixelToMapPosition(player.pos);
  playerStatus.text = `
    pixel: (${player.pos.x.toFixed(2)} ${player.pos.y.toFixed(2)})
    map: (${playerMapPos.x}, ${playerMapPos.y})
    `;
  

});
