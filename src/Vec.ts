export default class Vec {
  constructor(public x = 0, public y = 0) {}

  static from(vec: Vec) {
    return new Vec().copy(vec);
  }

  clone() {
    return Vec.from(this);
  }

  mag() {
    const { x, y } = this;
    return Math.sqrt(x * x + y * y);
  }

  set(x: number, y: number) {
    this.x = x;
    this.y = y;
    return this;
  }

  copy({ x, y }: Vec) {
    this.x = x;
    this.y = y;
    return this;
  }

  /**
   * Vector addition
   * @param param0
   * @returns
   */
  add({ x, y }: { x: number; y: number }) {
    this.x += x;
    this.y += y;
    return this;
  }

  /**
   * Vector Scaling
   * @param s scale factor for the vector
   */
  multiply(s: number) {
    this.x *= s;
    this.y *= s;
    return this;
  }

  normalize() {
    const mag = this.mag();

    if(mag > 0 ) {
      this.x /= mag;
      this.y /= mag;
    }

    return this;
  }
}
