import Camera from "./Camera";
import Container from "./Container";
import Entity from "./Entity";
import Text from "./Text";
import Texture from "./Texture";

export default class Renderer {
  canvasWidth: number;
  canvasHeight: number;

  readonly canvas: HTMLCanvasElement;
  readonly ctx: CanvasRenderingContext2D;

  constructor(w: number, h: number) {
    this.canvasWidth = w;
    this.canvasHeight = h;

    this.canvas = document.createElement("canvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.canvas.width = w;
    this.canvas.height = h;
    document.body.appendChild(this.canvas);

    // document.addEventListener('DOMContentLoaded', () => {
    //   this.canvas.width = window.innerWidth;
    //   this.canvas.height = window.innerHeight;
    // })
  }

  /**
   * renders a collection of entities 'The Container Class'
   */
  render(this: Renderer,container: Container) {
    const { ctx } = this;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const renderChildren = (container: Container) => {

      container.children.forEach((child: Entity | Container) => {
        ctx.save();

        // apply settings
        if (child.style) {
          if (child.style.fillStyle) {
            ctx.fillStyle = child.style.fillStyle;
          }
          if (child.style.strokeStyle) {
            ctx.fillStyle = child.style.strokeStyle;
          }
        }

        if(child instanceof Text) {
          ctx.font = child.font;
          ctx.shadowOffsetY = 1;
          ctx.shadowOffsetY = 1;
          ctx.shadowBlur = 4;
          ctx.shadowColor = 'black';
        }

        if (child.pos) {
          ctx.translate(child.pos.x, child.pos.y);
        }

        if (child instanceof Texture) {
          ctx.drawImage(child.img, 0, 0, child.w,child.h);
        }
        if (child instanceof Text) {
          ctx.fillText(child.text, 0,0);
        }
        // actually draw the shapes
        switch (child.shape) {
          case "rect":
            this.drawRect(child.w, child.h);
            break;
          case "circle":
            break;
          default:
          // console.log("(-|-)")
        }

        if (child instanceof Container && child.children.length > 0) {
          renderChildren(child);
        }

        // restore() only after rendering all children to effect the children's position by their parent
        ctx.restore();
      });
    };

    renderChildren(container);


  }

  private drawRect(this: Renderer, w: number, h: number) {
    this.ctx.fillRect(0, 0, w, h);
  }
}
