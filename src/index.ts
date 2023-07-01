import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants";
import Game from "./pop/Game";
import pop from "./pop/index";
const { KeyControls } = pop;

const w = CANVAS_WIDTH;
const h = CANVAS_HEIGHT;
const game = new Game(w, h);




game.run((dt: number, t: number) => {
});

