import { Position } from "../models";

class MouseControls {
    pos: Position = { x: 0, y: 0};
    isDown: boolean;
    pressed: boolean;
    released: boolean;
    el: HTMLElement;
    constructor(container: HTMLElement) {
      this.el = container || document.body;
  
      this.pos = { x: 0, y: 0 };
      this.isDown = false;
      this.pressed = false;
      this.released = false;
  
      // Handlers
      document.addEventListener("mousedown", e => this.down(e), false);
      document.addEventListener("mouseup", e => this.up(), false);
      document.addEventListener("mousemove", e => this.move(e), false);
    }
  
    mousePosFromEvent({ clientX, clientY }: {clientX: number, clientY: number}) {
      const { el, pos } = this;
      const rect = el.getBoundingClientRect();
      pos.x = clientX - rect.left;
      pos.y = clientY - rect.top;
    }
  
    down(e: MouseEvent) {
      this.isDown = true;
      this.pressed = true;
      this.mousePosFromEvent(e);
    }
  
    up() {
      this.isDown = false;
      this.released = true;
    }
  
    move(e: MouseEvent) {
      this.mousePosFromEvent(e);
    }
  
    update() {
      this.released = false;
      this.pressed = false;
    }
  }
  
  export default MouseControls;
  