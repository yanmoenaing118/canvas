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



const dungeon = scene.add(new Dungeon());


game.run(() => {
  

  
});
