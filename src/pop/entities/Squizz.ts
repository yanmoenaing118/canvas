import TileSprite from "../TileSprite";
import { textures } from "../textures";
import math from "../utils/math";

export default class Squizz extends TileSprite {
  speed: number;
  constructor() {
    super(textures.squizz, 32, 32);
    this.speed = math.randf(0.05, 0.15);
    // this.update = (dt: number, t: number) => {
    //   this.frame.x = Math.floor(t / this.speed) % 4;
    // };
  }
}
