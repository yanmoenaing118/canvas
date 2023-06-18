import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants";
import Game from "./pop/Game";
import MouseControls from "./pop/controls/MouseControls";
import pop from "./pop/index";
import GameOverScreent from "./screens/GameOverScreen";
import GameScreen from "./screens/GameScreen";
import StartScreen from "./screens/StartScreen";
const { KeyControls, math } = pop;

const w = CANVAS_WIDTH;
const h = CANVAS_HEIGHT;
const game = new Game(w, h);
const controls = new KeyControls();
const mouseControls = new MouseControls(game.renderer.view);



/**
 * Game Screens Life Cycle - (Changing screen is just changing the base Container which will be rendered by the Renderer)
 * 
 * start - play - gameOver - restart
 */


function showStartScreen() {
    const startScreen = new StartScreen('Click anywhere to start!', w,h,mouseControls, playGame)
    game.scene = startScreen;
}

function playGame() {
    const gameScreen = new GameScreen(game,controls, showGameOverScreen);
    game.scene = gameScreen;
}

function showGameOverScreen() {
    const gameOverScreen  = new GameOverScreent(mouseControls, playGame);
    game.scene = gameOverScreen;
}


showStartScreen();
game.run();

