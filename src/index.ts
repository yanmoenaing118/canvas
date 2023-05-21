import Game from "./pop/Game";
import pop from "./pop/index";
import Sprite from "./pop/Sprite";
const { Container, KeyControls, Text, Texture, math } = pop;



// Game setup code
const w = 640;
const h = 300;
const game = new Game(w, h);
let dt = 1/60;

// Load game textures
const textures = {
  background: new Texture("images/bg.png"),
  spaceship: new Texture("images/spaceship.png"),
  bullet: new Texture("images/bullet.png"),
  baddie: new Texture("images/baddie.png"),
  building: new Texture("images/building.png"),
};

console.log(textures);

// Game objects
const scene = game.scene;
const controls = new KeyControls();
scene.add(new Sprite(textures.background));


const makeRandom = (b: Sprite, x: number) => {
  b.scale.x = math.randf(1,3);
  b.scale.y = math.randf(1,3);
  b.pos.x = x;
  b.pos.y = h - b.scale.y * 64;
}


const buildings = new Container();
for (let i = 0; i <= 50; i++) {
  const building = buildings.add(new Sprite(textures.building));
  makeRandom(building, math.rand(w));
}
scene.add(buildings);
console.log(buildings);

const ship = scene.add(new Sprite(textures.spaceship));

ship.pos.x =  w / 2;
ship.pos.y = h / 2;

ship.anchor = {
  x: -16,
  y: -16
}
const flipped = Math.random() < 0.5;
ship.scale.x = flipped ? -1 : 1;
ship.anchor.x = flipped ? 32 : 0;
const ships = new Container();
for (let i = 0; i < 10; i++) {
  const ship = ships.add(new Sprite(textures.spaceship));
  ship.pivot = { x: 16, y: 16 };
  ship.pos.x = i * 32;
}


scene.add(ships);
game.run((dt: number, t: number) => {
  console.log(dt);
  const rps = 2 * Math.PI  * dt; // One revolution per second
  ships.map((s: Sprite, i: number) => {
    s.rotation += rps;
  });
  buildings.map(function (building: Sprite) {
    building.pos.x -= 100 * dt;
    if(building.pos.x < -80) {
      building.pos.x = w + 100;
    }
  });
});
