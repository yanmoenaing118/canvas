import Squizz from "./pop/entities/Squizz";
import Game from "./pop/Game";
import pop from "./pop/index";
import Level from "./Level";
import Sprite from "./pop/Sprite";
import Camera from "./pop/Camera";
import Buddie from "./pop/entities/Buddie";
const { textures, KeyControls, math } = pop;

const w = 640;
const h = 480;
const game = new Game(w, h);

const controls = new KeyControls();

const scene = game.scene;
// scene.add(new Sprite(textures.background));

const wrold = {
  w: w + w * 0.5,
  h: w + h * 0.4
}

const level = new Level(wrold.w, wrold.h);
const squizz = new Squizz(controls);
const camera = new Camera(squizz, { w, h}, wrold);
const buddie = new Buddie(320,0);

camera.add(level);
camera.add(squizz);
camera.add(buddie);
scene.add(camera);
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

  level.checkGround(squizz.pos);



});
