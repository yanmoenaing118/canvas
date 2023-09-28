import KeyControls from "./KeyControls";
import Texture from "./Texture";
import TileSprite from "./TileSprite";
import renderUpdate from "./loop";

const controls = new KeyControls();

const tile =  new TileSprite(new Texture('spider10.png'), 64, 64, 64, 64, 0, 0, { x: 0, y: 0})

function render(ctx: CanvasRenderingContext2D) {
  tile.render(ctx)
}

function update(dt: number, t: number) {
 
}

renderUpdate(render, update);
