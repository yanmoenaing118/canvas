import Sprite from "../pop/Sprite";
import Texture from "../pop/Texture";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants";
import math from "../pop/utils/math";
import { Position } from "../pop/models";

class Cheese extends Sprite {
  pos2: Position;
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
  }

  update(dt: number, t: number): void {
      this.pos2.x = this.pos.x + this.w;
      this.pos2.y = this.pos.y + this.h;
  }
 
}

export default Cheese;
