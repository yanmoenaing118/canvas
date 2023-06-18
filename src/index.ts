import Squizz from "./pop/entities/Squizz";
import Game from "./pop/Game";
import pop from "./pop/index";
import Level from "./Level";
import Camera from "./pop/Camera";
import Container from "./pop/Container";
import Baddie from "./pop/entities/Baddie";
import entity from "./pop/utils/entities";
import TileSprite from "./pop/TileSprite";
const { KeyControls, math } = pop;

const w = 640;
const h = 480;
const game = new Game(w, h);

const controls = new KeyControls();

const scene = game.scene;

const wrold = {
  w: w + w * 0.5,
  h: w + h * 0.4,
};

const level = new Level(wrold.w, wrold.h);
const squizz = new Squizz(controls);
squizz.pos.x = w / 2 - squizz.w * 0.5;
squizz.pos.y = h / 2 - squizz.h * 0.5;
const camera = new Camera(squizz, { w, h }, wrold);
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
    b.frame = { x: 1, y: 0 };
    b.pos.x = Math.floor(level.w / 10) * i + level.tileW;
  }
  return baddies;
}

function updateBaddies() {
  baddies.map((b: Baddie) => {
    const { pos } = b;
    if (entity.distance(squizz as TileSprite, b as TileSprite) < 32) {
      squizz.dead = true;
      if (b.xSpeed) pos.x = -level.w;
      else pos.y = -level.h;
    }

    if (pos.x > level.w) pos.x = -32;
    if (pos.y > level.h) pos.y = -32;
  });
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

  updateBaddies();

  const ground = level.checkGround(squizz.pos);
  if(ground == 'cleared') {
    squizz.dead = true;
  }
});
