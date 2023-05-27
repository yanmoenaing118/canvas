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

const mouse = new MouseControls(game.renderer.view);
// Game objects

const scene = game.scene;
scene.add(new Sprite(textures.background));

const balls = new Container();

for (let i = 0; i < 20; i++) {
  const ball = balls.add(new Squizz());
  ball.pos.x = 0;
  ball.pos.y = math.rand(h);
}
console.log(balls);
scene.add(balls);

const distance = (a: Position, b: Position) => {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
};

game.run((dt: number, t: number) => {
  balls.map((ball: Squizz) => {
    if (ball.pos.x > w) {
      ball.pos.x = -32;
      ball.speed *= 1.1;
    }
    if (mouse.pressed && distance(mouse.pos, ball.pos) < 16) {
      if (ball.speed > 0) {
        ball.speed = 0;
      } else {
        ball.dead = true;
      }
    }
  });

  mouse.update();
});
