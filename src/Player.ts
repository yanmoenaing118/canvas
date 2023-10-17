import Rect from "./Rect";

export default class Player extends Rect {
  vel = 0;
  jumping = false;
  speed = 400;
  color = "black";
  constructor() {
    const size = 64;
    super(0, 0, size, size, "white");
  }

  update(dt: number, t: number) {}
}
