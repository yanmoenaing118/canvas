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

const buildings = new Container();
for (let i = 0; i < 20; i++) {
  const building = new Sprite(textures.building);
  building.pos.x = Math.random() * w;
  building.pos.y = Math.random() * h + 60;
  building.scale.y = 3 + Math.random();
  building.scale.x = 1.3 + Math.random();
  buildings.add(building);
}
scene.add(buildings);


const ship = scene.add(new Sprite(textures.spaceship));

ship.pos.x = Math.random() * w / 2;
ship.pos.y = Math.random() * h / 2;

ship.update = function(dt: number, t: number) {

}

game.run((dt: number, t: number) => {
  ship.scale.x = Math.abs(Math.sin(t)) + 0.5;
  ship.scale.y = Math.abs(Math.sin(t)) + 0.5;
  buildings.map(function (building: Sprite) {
    building.pos.x -= 100 * dt;
    if(building.pos.x < -80) {
      building.pos.x = w + 100;
    }
  });
});
