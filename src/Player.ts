import Texture from "./Texture";
import TileSprite from "./TileSprite";

export default class Player extends TileSprite {
  vel = 0;
  jumping = false;
  constructor() {
    super(new Texture("spider10.png"), 64, 64, 64, 64, 0, 0, {
      x: 2,
      y: 3,
    });
  }

  update(dt: number, t: number) {}
}
