import MouseControls from "./pop/controls/MouseControls";
import Squizz from "./pop/entities/Squizz";
import Game from "./pop/Game";
import pop from "./pop/index";
import { Position } from "./pop/models";
import Sprite from "./pop/Sprite";
const { textures, Container, KeyControls, Text, Texture, math } = pop;

// Game setup code
const w = 640;
const h = 300;
const game = new Game(w, h);
const context = game.renderer.ctx;
let dt = 1 / 60;

const controls = new KeyControls();
// Game objects

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


scene.add(squizz);

game.run((dt: number, t: number) => {

    if(controls.x || controls.y) {
        squizz.anims.play('walk')
    } else {
        squizz.anims.play('up')
    }
    
    
});
