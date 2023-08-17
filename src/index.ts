import { CANVAS_HEIGHT, CANVAS_WIDTH, TILE_SIZE } from "./constants";
import Bat from "./entities/Bat";
import Bullet from "./entities/Bullet";
import Dungeon from "./entities/Dungeon";
import Player from "./entities/Player";
import Totem from "./entities/Totem";
import Container from "./pop/Container";
import Game from "./pop/Game";
import Text from "./pop/Text";
import pop from "./pop/index";
import math from "./pop/utils/math";
import GameScreen from "./screens/GameScreen";
const { KeyControls } = pop;

const controls = new KeyControls();
const w = CANVAS_WIDTH;
const h = CANVAS_HEIGHT;
const game = new Game(w, h);
const { scene } = game;

game.scene = new GameScreen(game, controls);
game.run();