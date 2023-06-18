import Squizz from "./pop/entities/Squizz";
import Game from "./pop/Game";
import pop from "./pop/index";
import Level from "./Level";
import Sprite from "./pop/Sprite";
import Camera from "./pop/Camera";
import Container from "./pop/Container";
import Baddie from "./pop/entities/Baddie";
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
const baddies = addBaddies(level);

camera.add(level);
camera.add(squizz);
camera.add(baddies);
scene.add(camera);

function addBaddies(level: Level): Container {
  const baddies = new Container();
  for (let i = 0; i < 5; i++) {
    const b = baddies.add(new Baddie(32 * 5, 0));
    b.pos.y = Math.floor(level.h / 5) * i + level.tileH * 2;
  }
  for (let i = 0; i < 10; i++) {
    const b = baddies.add(new Baddie(0, 32 * 5));
    b.frame = {x: 1, y: 0};
    b.pos.x = Math.floor(level.w / 10) * i + level.tileW;
  }
  return baddies;
}

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
