import Container from "../Container";
import Rect from "../Rect";

class CanvasRenderer {
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
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.textBaseline = "top";
  }

  render(container: Container, clear = true) {
    if (container.visible == false) {
      return;
    }
    const { ctx } = this;

    function renderRec(container: Container) {
      // Render the container children
      container.children.forEach((child) => {
        if (child.visible == false) {
          return;
        }
        ctx.save();

        // Handle transforms
        /** Note:
         *  translate to the correct position, scale to the correct size, then rotate.
         *  If we rotated first before scaling, our pivot point would be incorrect.
         */
        if (child.pos) {
          ctx.translate(Math.round(child.pos.x), Math.round(child.pos.y));
        }
        if (child.anchor) {
          ctx.translate(child.anchor.x, child.anchor.y);
        }
        if (child.scale) {
          ctx.scale(child.scale.x, child.scale.y);
        }
        if (child.rotation) {
          const px = child.pivot.x ? child.pivot.x : 0;
          const py = child.pivot.y ? child.pivot.y : 0;
          ctx.translate(px, py);
          ctx.rotate(child.rotation);
          ctx.translate(-px, -py);
        }

        // Draw the leaf nodes
        if (child.text) {
          const { font, fill, align } = child.style;
          if (font) ctx.font = font;
          if (fill) ctx.fillStyle = fill;
          if (align) ctx.textAlign = align;
          ctx.fillText(child.text, 0, 0);
        }

        if (child.texture) {
          const img = child.texture.img;
          if (child.tileW) {
            ctx.drawImage(
              img,
              child.frame.x * child.tileW,
              child.frame.y * child.tileH,
              child.tileW,
              child.tileH,
              0,
              0,
              child.tileW,
              child.tileH
            );
          } else {
            ctx.drawImage(child.texture.img, 0, 0);
          }
        }
        
        if(child instanceof Rect) {
          ctx.fillStyle = child.style.fill;
          ctx.fillRect(0,0,child.w,child.h);
        }
        // Render any child sub-nodes
        if (child.children) {
          console.log('hello')
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

export default CanvasRenderer;
