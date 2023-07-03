import Sprite from "../pop/Sprite";
import Texture from "../pop/Texture";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants";
import math from "../pop/utils/math";
import { Position } from "../pop/models";
import Rect from "../pop/Rect";

class Cheese extends Sprite {
  pos2: Position;
  hitBox = {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
  };
  // debug rects
  children: Rect[] = [];
  constructor() {
    super(new Texture("./images/cheese.png"));
    this.pos = {
      x: math.rand(CANVAS_WIDTH - 100),
      y: math.rand(CANVAS_HEIGHT - 50),
    };

    this.w = 74;
    this.h = 50;
    this.pos2 = {
      x: this.pos.x + this.w,
      y: this.pos.y + this.h,
    };

    this.hitBox = {
      x: 0,
      y: 10,
      w: 100,
      h: 40,
    };
  }

  update(): void {
      this.pos2.x = this.pos.x + this.w;
      this.pos2.y = this.pos.y + this.h;
  }
 
}

export default Cheese;
