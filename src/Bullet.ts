import Sprite from "./Sprite";
import Texture from "./Texture";
import { w } from "./constants";

export default class Bullet extends Sprite {
  speed: number = 2500;
  constructor() {
    super(new Texture("./assets/bullet.png"));
    this.w = 16;
    this.h = 16;
  }

  update(dt: number, t: number) {
    this.pos.x += dt * this.speed;
    if (this.pos.x > w) {
      this.dead = true;
    }
  }

  render(context: CanvasRenderingContext2D) {
    context.save();
    context.translate(this.pos.x, this.pos.y);
    context.rotate(Math.PI / 2);
    context.drawImage(this.texture.img, 0, 0);
    context.restore();
  }
}
