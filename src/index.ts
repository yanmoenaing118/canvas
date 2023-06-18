import Game from "./pop/Game";
import pop from "./pop/index";
import GameScreen from "./screens/GameScree";
const { KeyControls, math } = pop;

const w = 640;
const h = 480;
const game = new Game(w, h);
const controls = new KeyControls();

const gameScreen = new GameScreen(game,controls);

game.scene = gameScreen;
game.run();

