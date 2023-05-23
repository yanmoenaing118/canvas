import Sprite from "./Sprite";
import Texture from "./Texture";

export default class TileSprite extends Sprite {
  tileW: number;
  tileH: number;
  frame: { x: number; y: number };
  constructor(texture: Texture, w: number, h: number) {
    super(texture);
    this.tileW = w;
    this.tileH = h;
    this.frame = { x: 0, y: 0 };
  }
}
