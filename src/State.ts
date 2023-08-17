export default class State {
  lastState: string = "";
  time: number = 0;
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
      this.time = 0;
    } else {
      this.time += dt;
    }
    this.justSetState = false;
  }
}
