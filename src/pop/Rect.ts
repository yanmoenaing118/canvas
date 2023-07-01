import Sprite from "./Sprite";
import { Position } from "./models";

class Rect {
  pos: Position;
  w: number;
  h: number;
  style: { [key: string]: string } = {};
  constructor(w: number, h: number, style = { fill: "#333" }) {
    this.pos = { x: 0, y: 0 };
    this.w = w;
    this.h = h;
    this.style = style;
  }

  update(dt: number, t: number) {
  }
}

export default Rect;
