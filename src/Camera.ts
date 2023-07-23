import Entity from "./Entity";
import Rect from "./Rect";
import { renderRect } from "./renderers";

export default class Camera extends Rect {
  worldSize = { w: 0, h: 0};
  maxX: number;
  maxY: number;
  speed = 640;
  constructor(w: number, h: number, worlSize: { w: number, h: number}) {
    super("rgba(225,225,225,0.4)");
    this.w = w;
    this.h = h;
    this.worldSize = worlSize;
    this.maxX = worlSize.w - this.w;
    this.maxY = worlSize.h - this.h;
  }


  render(ctx: CanvasRenderingContext2D) {
    // ctx.save(); 
    // ctx.fillStyle = this.style.fill || 'red';
    // ctx.translate(this.pos.x, this.pos.y);
    // ctx.fillRect(0,0,32,32);
    // ctx.restore();
    // renderRect(this, ctx);
  }
}
