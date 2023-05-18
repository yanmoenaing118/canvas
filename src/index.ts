import Game from "./pop/Game";
import pop from "./pop/index";
import Sprite from "./pop/Sprite";
const { Container, KeyControls, Text, Texture, math } = pop;



// Game setup code
const w = 640;
const h = 300;
const game = new Game(w, h);

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

ship.pos.x = Math.random() * w / 2;
ship.pos.y = Math.random() * h / 2;



game.run((dt: number, t: number) => {
  console.log(Math.sin(t))
  ship.scale.x = Math.max(Math.abs(Math.sin(t)) + 0.25, 0.25) + 1;
  ship.scale.y = Math.max(Math.abs(Math.sin(t)) + 0.25, 0.25) + 1;
  buildings.map(function (building: Sprite) {
    building.pos.x -= 100 * dt;
    if(building.pos.x < -80) {
      building.pos.x = w + 100;
    }
  });
});
