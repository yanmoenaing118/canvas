import { CANVAS_HEIGHT, CANVAS_WIDTH, TILE_SIZE } from "./constants";
import Bat from "./entities/Bat";
import Bullet from "./entities/Bullet";
import Dungeon from "./entities/Dungeon";
import Player from "./entities/Player";
import Totem from "./entities/Totem";
import Container from "./pop/Container";
import Game from "./pop/Game";
import Text from "./pop/Text";
import pop from "./pop/index";
import math from "./pop/utils/math";
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

for (let i = 0; i < 4; i++) {
  scene.add(new Bat());
}

playerStatus.pos.y = 25;
player.pos.x = player.w;
player.pos.y = player.h;

// scene.add(playerStatus);
scene.add(player);

const bullets = new Container();

for (let i = 0; i < 2; i++) {
  scene.add(
    new Totem(
      player,
      dungeon.mapPositionToPixel({ x: math.rand(dungeon.mapW), y: math.rand(dungeon.mapH) }),
      fireBullets
    )
  );
}

function fireBullets(bullet: Bullet) {
  bullets.add(bullet)
}
scene.add(bullets)
game.run(() => {
  const playerMapPos = dungeon.pixelToMapPosition(player.pos);
  playerStatus.text = `
    pixel: (${player.pos.x.toFixed(2)} ${player.pos.y.toFixed(2)})
    map: (${playerMapPos.x}, ${playerMapPos.y})
    `;
});
