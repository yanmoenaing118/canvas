import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants";
import Cheese from "./entities/Cheese";
import Mouse from "./entities/Mouse";
import Game from "./pop/Game";
import Rect from "./pop/Rect";
import pop from "./pop/index";
import entities from "./pop/utils/entities";
import math from "./pop/utils/math";
const { KeyControls } = pop;

const controls = new KeyControls();
const w = CANVAS_WIDTH;
const h = CANVAS_HEIGHT;
const game = new Game(w, h);
const { scene } = game;
const mouse = new Mouse(controls);
const cheese = new Cheese();


scene.add(cheese);
scene.add(mouse);

entities.debug(cheese)
entities.debug(cheese)
entities.debug(mouse)

game.run(() => {
  
  let { pos: mousePos, hitBox: mouseHitBox } = mouse;
  const { pos: cheesePos } = cheese;

  
  
  if(
    mousePos.x + mouseHitBox.x <= cheesePos.x + cheese.w &&
    mousePos.x + mouseHitBox.x + mouseHitBox.w >= cheesePos.x &&
    mousePos.y + mouseHitBox.y <= cheesePos.y + cheese.h &&
    mousePos.y + mouseHitBox.y + mouse.h >= cheesePos.y
  ) {

    cheese.pos.x = math.rand(CANVAS_WIDTH - cheese.w);
    cheese.pos.y = math.rand(CANVAS_HEIGHT - cheese.h)
  }

  
});
