/**
 * An initial touch point
 * Listen touch move
 * draw line to final touch list point
 */

import { drawPath } from "./renderers";

interface Vec2 {
  x: number;
  y: number;
}

export class TouchControl {
  touchPoint: Vec2 | null;
  canvas: HTMLCanvasElement;

  finalPoint: Vec2 | null;

  constructor(canvas: HTMLCanvasElement) {
    this.touchPoint = null;
    this.finalPoint = null;
    this.canvas = canvas;

    canvas.addEventListener("touchstart", (e) => {
      this.touchStart(e);
    });
    canvas.addEventListener("touchend", this.touchEnd);
    canvas.addEventListener("touchmove", (e) => {
      this.touchMove(e);
    });
  }

  touchStart(e: TouchEvent) {
    e.preventDefault();
    const touches = e.changedTouches;

    this.touchPoint = { x: 0, y: 0 };

    for (let i = 0; i < touches.length; i++) {
      const touch = touches[i];

      const x = touch.pageX - this.canvas.offsetLeft;
      const y = touch.pageY - this.canvas.offsetTop;

      this.touchPoint.x = x;
      this.touchPoint.y = y;
    }
  }

  touchMove(e: TouchEvent) {
    e.preventDefault();

    const touches = e.changedTouches;
    const touch = touches[touches.length - 1];
    this.finalPoint = {...this.touchPoint as Vec2};

    const x = touch.pageX - this.canvas.offsetLeft;
    const y = touch.pageY - this.canvas.offsetTop;


    this.finalPoint.x = x;
    this.finalPoint.y = y;

    // for (let i = 0; i < touches.length; i++) {
    //     const touch = touches[i];

    //     this.touchPoint.x = x;
    //     this.touchPoint.y = y;
    //   }
  }

  touchEnd() {}

  render(ctx: CanvasRenderingContext2D) {
    if (!this.touchPoint) return;
    drawPath(ctx, this.touchPoint.x, this.touchPoint.y, 'red');

    if(this.finalPoint) {
        drawPath(ctx, this.finalPoint.x, this.finalPoint.y, 'green');
    }
  }
}
