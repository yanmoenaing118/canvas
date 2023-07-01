import Texture from "../pop/Texture";
import TileSprite from "../pop/TileSprite";

const texture = new Texture("./images/baddie-walk.png");

export default class Baddie extends TileSprite {
  xSpeed: number;
  ySpeed: number;

  constructor(xSpeed: number, ySpeed: number) {
    super(texture, 32, 32);
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
  }

  update(dt: number): void {
    this.pos.x += dt * this.xSpeed;
    this.pos.y += dt * this.ySpeed;
  }
}
