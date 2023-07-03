import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants";
import Cheese from "./entities/Cheese";
import Dungeon from "./entities/Dungeon";
import Mouse from "./entities/Mouse";
import Container from "./pop/Container";
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

const cheeses = new Container();

for (let i = 0; i < 10; i++) {
 const cheese = cheeses.add(new Cheese());
 entities.debug(cheese);
}


// scene.add(cheeses);
// scene.add(mouse);

const dungeon = scene.add(new Dungeon());

console.log(dungeon)
// entities.debug(mouse)

game.run(() => {
  
  entities.hits(mouse, cheeses, (cheese: Cheese) => {
    cheese.pos = entities.relocate(CANVAS_WIDTH - cheese.w, CANVAS_HEIGHT - cheese.h);
  })

  
});
