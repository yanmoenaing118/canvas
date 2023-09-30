import KeyControls from "./KeyControls";
import LevelMap from "./LevelMap";
import Texture from "./Texture";
import TileSprite from "./TileSprite";
import renderUpdate from "./loop";

const controls = new KeyControls();

const map = new LevelMap();
const tile = new TileSprite(
  new Texture("spider10.png"),
  64,
  64,
  64,
  64,
  map.playerPos.x,
  map.playerPos.y,
  {
    x: 0,
    y: 0,
  }
);
function render(ctx: CanvasRenderingContext2D) {
  map.render(ctx);
  tile.render(ctx);
}

function update(dt: number, t: number) {}

renderUpdate(render, update);
