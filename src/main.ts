import KeyControls from "./KeyControls";
import LevelMap from "./LevelMap";
import Player from "./Player";
import RectLevel from "./RectLevel";
import Texture from "./Texture";
import TileSprite from "./TileSprite";
import { h, w } from "./canvas";
import renderUpdate from "./loop";
import { clamp } from "./utils";



const map = new RectLevel(w, h);


function render(ctx: CanvasRenderingContext2D) {
  map.render(ctx);
}

function update(dt: number, t: number) {
}

renderUpdate(render, update);
