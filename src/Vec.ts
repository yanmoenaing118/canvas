export default class Vec {
  constructor(public x: number, public y: number) {}

  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

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

  mul(scalar: number) {
    this.x *= scalar;
    this.y *= scalar;
  }

  copy() {
    return new Vec(this.x, this.y);
  }
}
