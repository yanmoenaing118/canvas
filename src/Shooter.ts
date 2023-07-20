import Rect from "./Rect";
import { HEIGHT, WIDTH } from "./constants";

export default class Shooter extends Rect {
  constructor() {
    super();
    this.pos.x = WIDTH / 2;
    this.pos.y = HEIGHT / 2;
    this.style.fill = "black";
  }
  
}
