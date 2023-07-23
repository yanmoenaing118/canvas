import Entity from "./Entity";
import Rect from "./Rect";
import { Styles } from "./interfaces";

export default class Title extends Entity {
  title: string;

  constructor(title: string = "", styles: Styles) {
    super();
    this.title = title;
    this.style = styles;
  }

  render(ctx: CanvasRenderingContext2D) {
    const { style } = this;

    ctx.save();
    if (style.fill) {
      ctx.fillStyle = style.fill;
    }

    if (style.stroke) {
      ctx.strokeStyle = style.stroke;
    }

    if (style.font) {
      ctx.font = style.font;
    }

    ctx.fillText(this.title, this.pos.x, this.pos.y);

    ctx.restore();
  }
}
