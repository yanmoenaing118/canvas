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



game.run((dt: number, t: number) => {

});
