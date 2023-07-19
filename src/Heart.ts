import { ctx } from ".";
import Bat from "./Bat";
import { renderImg } from "./Renderers";
import Texture from "./Texture";

export default class Heart extends Bat {
  globalAlpha = 0.3;
  img = new Texture("heart64x64.png").img;

  update(dt: number, t: number): void {
    super.update(dt, t);
    const sin = Math.sin(t);
    this.scale.x = sin * Math.sign(sin) + 0.1;
    this.scale.y = sin * Math.sign(sin) + 0.1;
    // this.globalAlpha = alpha < 0 ? alpha * -1 : alpha;
  }

  render(): void {
    ctx.save();
    ctx.globalAlpha = this.globalAlpha;
    renderImg(this, ctx);
    ctx.restore();
  }
}
