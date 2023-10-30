export default class Vec {
  constructor(public x = 0, public y = 0) {}

  mag(){
    /**
     * Pythagoras Theoram
     */
    const {x, y} = this;
    return Math.sqrt(x * x + y * y);
  }

  set(x: number, y: number) {
    this.x = x;
    this.y = y;
    return this;
  }
}
