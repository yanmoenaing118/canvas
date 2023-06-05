import MouseControls from "./pop/controls/MouseControls";
import Squizz from "./pop/entities/Squizz";
import Game from "./pop/Game";
import pop from "./pop/index";
import Level from "./pop/Level";
import { Frame, Position } from "./pop/models";
import Sprite from "./pop/Sprite";
const { textures, Container, KeyControls, Text, Texture, math } = pop;

const w = 640;
const h = 320;
const game = new Game(w, h);

const controls = new KeyControls();

const scene = game.scene;
scene.add(new Sprite(textures.background));

const squizz = new Squizz(controls);
squizz.pos.x = w / 2;
squizz.pos.y = h / 2;



const level = new Level(w, h);

scene.add(level);
scene.add(squizz);

game.run((dt: number, t: number) => {


});
