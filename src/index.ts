import { CANVAS_HEIGHT, CANVAS_WIDTH, TILE_SIZE } from "./constants";
import Bat from "./entities/Bat";
import Dungeon from "./entities/Dungeon";
import Player from "./entities/Player";
import Totem from "./entities/Totem";
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

for (let i = 0; i < 10; i++) {
  scene.add(new Bat());
}

playerStatus.pos.y = 25;
player.pos.x = player.w;
player.pos.y = player.h;

scene.add(playerStatus);
scene.add(player);

const totem1 = scene.add(
  new Totem(dungeon.mapPositionToPixel({ x: dungeon.mapW / 2, y: 0 }))
);
const totem2 = scene.add(
  new Totem(dungeon.mapPositionToPixel({ x: 12, y: dungeon.mapH - 1 }))
);
const totem3 = scene.add(
  new Totem(dungeon.mapPositionToPixel({ x: 0, y: dungeon.mapH / 2 }))
);
const totem4 = scene.add(
  new Totem(
    dungeon.mapPositionToPixel({ x: dungeon.mapW - 1, y: dungeon.mapH / 2 })
  )
);

game.run(() => {
  const playerMapPos = dungeon.pixelToMapPosition(player.pos);
  playerStatus.text = `
    pixel: (${player.pos.x.toFixed(2)} ${player.pos.y.toFixed(2)})
    map: (${playerMapPos.x}, ${playerMapPos.y})
    `;
});
