export default class Vec {
  constructor(public x: number, public y: number) {}

  set(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(vec: Vec) {
    this.x += vec.x;
    this.y += vec.y;
  }
}
