import Squizz from "./pop/entities/Squizz";
import Game from "./pop/Game";
import pop from "./pop/index";
import Level from "./pop/Level";
import Sprite from "./pop/Sprite";
const { textures, KeyControls, math } = pop;

const w = 640;
const h = 480;
const game = new Game(w, h);

const controls = new KeyControls();

const scene = game.scene;
scene.add(new Sprite(textures.background));

const squizz = new Squizz(controls);


const level = new Level(w, h);

scene.add(level);
scene.add(squizz);
console.log(level.bounds);
game.run((dt: number, t: number) => {
  squizz.pos.x = math.clamp(
    squizz.pos.x,
    level.bounds.left,
    level.bounds.right
  );
  squizz.pos.y = math.clamp(
    squizz.pos.y,
    level.bounds.top,
    level.bounds.bottom
  );

  const ground = level.checkGround(squizz.pos);
});
