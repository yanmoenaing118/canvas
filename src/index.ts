import Squizz from "./pop/entities/Squizz";
import Game from "./pop/Game";
import pop from "./pop/index";
import Sprite from "./pop/Sprite";
const { textures, Container, KeyControls, Text, Texture, math } = pop;

// Game setup code
const w = 640;
const h = 300;
const game = new Game(w, h);
const context = game.renderer.ctx;
let dt = 1 / 60;

// Load game textures

// Game objects
const scene = game.scene;
const controls = new KeyControls();
scene.add(new Sprite(textures.background));

const balls = new Container();

for (let i = 0; i < 10; i++) {
  const ball = balls.add(new Squizz());
  ball.pos.x = 0;
  ball.pos.y = math.rand(h);
  ball.update = (function () {
    let rate = math.randf(0.05,0.1);
    let currTime = 0;
    let currFrame = 0;
    let speed = math.rand(20,100);
    return (dt: number, t: number) => {
      ball.pos.x += dt * speed;
      currTime += dt;
      if (currTime > rate) {
        ball.frame.x = currFrame++ % 4;
        currTime -= rate;
      }
    };
  })();
}
console.log(balls);
scene.add(balls);
let rate = 0.25;
let currTime = 0;
game.run((dt: number, t: number) => {
  currTime += dt;
  if (currTime > rate) {
    // console.log(currTime.toFixed(1));
    currTime -= rate;
  } else {
    // console.log('test', currTime)
  }
});
