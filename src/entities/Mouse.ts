import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants";
import Rect from "../pop/Rect";
import Sprite from "../pop/Sprite";
import Texture from "../pop/Texture";
import KeyControls from "../pop/controls/KeyControls";
import { Position } from "../pop/models";
import math from "../pop/utils/math";

class Mouse extends Sprite {
  controls: KeyControls;
  pos2: Position;
  hitBox = {
    x: 18,
    y: 8,
    w: 70,
    h: 35,
  };

  // debug rects
  children: Rect[] = [];

  constructor(controls: KeyControls) {
    super(new Texture("./images/mouse.png"));
    this.w = 100;
    this.h = 51;
    this.pos2 = {
      x: this.pos.x + this.w,
      y: this.pos.y + this.h,
    };
    this.controls = controls;
    this.hitBox = {
      x: 18,
      y: 8,
      w: 70,
      h: 35,
    };
  }

  update(dt: number): void {
    this.pos.x += dt * 200 * this.controls.x;
    this.pos.y += dt * 200 * this.controls.y;

    this.pos.x = math.clamp(this.pos.x, 0, CANVAS_WIDTH - this.w);
    this.pos.y = math.clamp(this.pos.y, 0, CANVAS_HEIGHT - this.h);

    this.pos2.x = this.pos.x + this.w;
    this.pos2.y = this.pos.y + this.h;
  }
}

export default Mouse;