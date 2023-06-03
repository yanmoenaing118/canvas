import MouseControls from "./pop/controls/MouseControls";
import Squizz from "./pop/entities/Squizz";
import Game from "./pop/Game";
import pop from "./pop/index";
import { Position } from "./pop/models";
import Sprite from "./pop/Sprite";
import TileMap from "./pop/TileMap";
const { textures, Container, KeyControls, Text, Texture, math } = pop;

// Game setup code
const w = 640;
const h = 300;
const game = new Game(w, h);
const context = game.renderer.ctx;
let dt = 1 / 60;

const controls = new KeyControls();
// Game objects

const scene = game.scene;
// scene.add(new Sprite(textures.background));

const squizz = new Squizz();
squizz.pos.x = w / 2;
squizz.pos.y = h / 2;
squizz.anims.add(
  "walk",
  [0, 1, 2, 3].map((i) => {
    return { x: i, y: 0 };
  }),
  0.1
);

squizz.anims.add(
    "up",
    [0, 1, 2, 3].map((i) => {
      return { x: i, y: 1 };
    }),
    0.1
  );


// scene.add(squizz);

const tileSize = 32;
const tile = new Texture('./images/tiles.png');
const map = new TileMap(tile,w, h, tileSize,tileSize, tileSize * 5, tileSize * 5);

console.log(map);
// scene.add(map)

function renderMapGrid() {
  for(let i = 0; i < map.mapCols; i++ ) {
    context.save();
    context.beginPath();
    context.strokeStyle = 'white';
    context.translate(i * map.tileCellH, 0);
    context.moveTo(0, 0);
    context.lineTo(0, map.mapH);
    context.stroke();
    context.restore();
    
  }

  for(let j = 0; j < map.mapRows; j++) {
    context.save();
    context.beginPath();
    context.strokeStyle = 'white';
    context.translate(0, j * map.tileCellW);
    context.moveTo(0, 0);
    context.lineTo(map.mapW, 0);
    context.stroke();
    context.restore();
  }
}

renderMapGrid();

game.run((dt: number, t: number) => {

    if(controls.x || controls.y) {
        squizz.anims.play('walk')
    } else {
        squizz.anims.play('up')
    }
    
    
});
