import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants";
import Cheese from "./entities/Cheese";
import Mouse from "./entities/Mouse";
import Game from "./pop/Game";
import Rect from "./pop/Rect";
import pop from "./pop/index";
import math from "./pop/utils/math";
const { KeyControls } = pop;

const controls = new KeyControls();
const w = CANVAS_WIDTH;
const h = CANVAS_HEIGHT;
const game = new Game(w, h);
const { scene } = game;
const mouse = new Mouse(controls);
const cheese = new Cheese();

const rect = new Rect(32,32);

scene.add(cheese);
scene.add(mouse);
scene.add(rect);
console.log(mouse);
console.log(cheese);


game.run(() => {
  const { pos: m1, pos2: m2 } = mouse;
  const { pos: c1, pos2: c2, w: cw, h: ch } = cheese;

  if (m1.x <= c2.x && m2.x >= c1.x && m1.y <= c2.y && m2.y >= c1.y) {
    cheese.pos.x = math.rand(w - cw);
    cheese.pos.y = math.rand(h - ch);
  }
});
