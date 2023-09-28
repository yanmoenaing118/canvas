import Texture from "./Texture";
import { Vec2 } from "./classes";

export default class Sprite {
  pos: Vec2;
  constructor(
    public texture: Texture,
    public w: number,
    public h: number,
    x: number,
    y: number
  ) {
    this.pos = new Vec2(x, y);
  }
}
