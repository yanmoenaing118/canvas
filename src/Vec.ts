export default class Vec {
  constructor(public x: number, public y: number) {}

  set(x: number, y: number) {
    this.x = x;
    this.y = y;
    return this;
  }

  add(vec: Vec) {
    this.x += vec.x;
    this.y += vec.y;
  }

  sub(vec: Vec) {
    this.x -= vec.x;
    this.y -= vec.y;
  }
}
