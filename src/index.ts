import MouseControls from "./pop/controls/MouseControls";
import Squizz from "./pop/entities/Squizz";
import Game from "./pop/Game";
import pop from "./pop/index";
import Level from "./pop/Level";
import Sprite from "./pop/Sprite";
const { textures, Container, KeyControls, Text, Texture, math } = pop;

const w = 640;
const h = 320;
const game = new Game(w, h);

const controls = new KeyControls();

const scene = game.scene;
scene.add(new Sprite(textures.background));

const squizz = new Squizz();
squizz.pos.x = w / 2;
squizz.pos.y = h / 2;
squizz.anims.add(
  "walk",
  [0, 1, 2, 3].map((i) => {
    return { x: i, y: 0 };
  }),
  0.1
);

squizz.anims.add(
  "up",
  [0, 1, 2, 3].map((i) => {
    return { x: i, y: 1 };
  }),
  0.1
);



const level = new Level(w, h);

scene.add(level);
scene.add(squizz);

game.run((dt: number, t: number) => {

  squizz.pos.x += dt * 400 * controls.x;
  squizz.pos.y += dt * 400 * controls.y;

  if (controls.x || controls.y) {
    squizz.anims.play("walk");
  } else {
    squizz.anims.play("up");
  }
});
