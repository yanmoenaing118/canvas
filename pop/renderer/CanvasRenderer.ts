import Texture from "../Texture";

export default class CanvasRenderer {
  w: number;
  h: number;
  view: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(w: number, h: number) {
    const canvas = document.createElement("canvas");
    this.w = canvas.width = w;
    this.h = canvas.height = h;
    this.view = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  }

  render(container: any, clear: boolean = true) {
    const { ctx } = this;
    function renderRec(container: any) {
      container.children.forEach((child: any) => {
        if (child.visible === false) return;

        ctx.save(); // save current state before any state chagnes

        if (child.pos) {
          ctx.translate(Math.round(child.pos.x), Math.round(child.pos.y));
        }

        if(child.texture) {
          const texture: Texture = child.texture;
          ctx.drawImage(texture.image,0,0);
        }

        if (child.text) {
          const { font, fill, align } = child.style;
          if (font) ctx.font = font;
          if (fill) ctx.fillStyle = fill;
          if (align) ctx.textAlign = align;
          ctx.fillText(child.text, 0, 0);
        }

        if (child.children) {
          renderRec(child);
        }
        ctx.restore();
      });
    }

    if (clear) {
      ctx.clearRect(0, 0, this.w, this.h);
    }
    renderRec(container);
  }
}
