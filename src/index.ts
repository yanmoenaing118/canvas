import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants";
import Game from "./pop/Game";
import pop from "./pop/index";
import GameScreen from "./screens/GameScreen";
const { KeyControls } = pop;

const controls = new KeyControls();
const w = CANVAS_WIDTH;
const h = CANVAS_HEIGHT;
const game = new Game(w, h);

game.scene = new GameScreen(game, controls);



game.run();