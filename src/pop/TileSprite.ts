import AnimationManager from "./AnimationManager";
import Sprite from "./Sprite";
import Texture from "./Texture";

export default class TileSprite extends Sprite {
  tileW: number;
  tileH: number;
  frame: { x: number; y: number };
  anims: AnimationManager;
  constructor(texture: Texture, w: number, h: number) {
    super(texture);
    this.tileW = w;
    this.tileH = h;
    this.frame = { x: 0, y: 0 };
    this.anims = new AnimationManager(this);
  }

  update(dt: number, t: number): void {
    console.log('h')
    this.anims.update(dt); 
  }
}
