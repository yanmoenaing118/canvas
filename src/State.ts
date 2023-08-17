export default class State {
  lastState: string = "";
  ellapsedTime: number = 0;
  justSetState = false;

  constructor(private state: string) {
    this.set(state);
  }
  get() {
    return this.state;
  }

  set(state: string) {
    this.lastState = this.state;
    this.state = state;
    this.justSetState = true;
  }

  update(dt: number) {
    if (this.justSetState) {
      this.ellapsedTime = 0;
    } else {
      this.ellapsedTime += dt;
    }
    this.justSetState = false;
  }

  is(state: string) {
    return state === this.state;
  }
}
