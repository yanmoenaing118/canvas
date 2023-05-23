import Game from "./pop/Game";
import pop from "./pop/index";
import Sprite from "./pop/Sprite";
import TileSprite from "./pop/TileSprite";
const { Container, KeyControls, Text, Texture, math } = pop;

// Game setup code
const w = 640;
const h = 300;
const game = new Game(w, h);
const context = game.renderer.ctx;
let dt = 1 / 60;

// Load game textures
const textures = {
  background: new Texture("images/bg.png"),
  spaceship: new Texture("images/spaceship.png"),
  bullet: new Texture("images/bullet.png"),
  baddie: new Texture("images/baddie.png"),
  building: new Texture("images/building.png"),
  walker: new Texture("images/player-walk.png"),
};

console.log(textures);

// Game objects
const scene = game.scene;
const controls = new KeyControls();
scene.add(new Sprite(textures.background));
const walker = new TileSprite(textures.walker,32,32);
scene.add(walker)
const text = scene.add(new Text(''))

text.pos.x = 0;
text.pos.y = 100;


console.log(walker)
let num = 0.08;
game.run((dt: number, t: number) => {
  walker.frame.x = Math.floor(t /num) % 2;
  text.text = `${Math.floor(t)}`
  console.log(Math.floor(t /num) % 4 , t, t /num)
});
