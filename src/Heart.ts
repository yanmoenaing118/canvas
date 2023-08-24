import Sprite from "./Sprite";
import Texture from "./Texture";

export default class Heart extends Sprite {
  constructor() {
    super(new Texture("./assets/heart.png"));
    this.w = 16;
    this.h = 16;
    this.dead = false;
  }

  render(context: CanvasRenderingContext2D) {
    context.save();
    context.translate(this.pos.x, this.pos.y);
    context.scale(0.85, 0.85);
    context.drawImage(this.texture.img, 0, 0);
    context.restore();
  }
}
