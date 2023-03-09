export default class KeyControls {
  keys: any = {};
  pressedKey: string = "";
  constructor() {
    this.keys = {};

    document.addEventListener("keydown", (e) => {
      if ([37, 38, 39, 40].indexOf(e.which) > 0) {
        e.preventDefault();
      }
      this.keys[e.which] = true;
      this.pressedKey = e.key;
    });

    document.addEventListener("keyup", (e) => {
      this.keys[e.which] = false;
      this.pressedKey = "";
    });
  }

  // do something when spacebar is pressed - Jump/Shoot...
  get action() {
    return this.keys[32];
  }

  // get Left/Right or A/D keys
  get x() {
    if (this.keys[37] || this.keys[65]) {
      return -1;
    }
    // right arrow or D key
    if (this.keys[39] || this.keys[68]) {
      return 1;
    }
    return 0;
  }

  get y() {
    // up arrow or W key
    if (this.keys[38] || this.keys[87]) {
      return -1;
    }
    if (this.keys[40] || this.keys[83]) {
      return 1;
    }
    return 0;
  }

  // when we want to add a specific key for a specific action
  key(key: string | number, value: string | number | boolean) {
    if (value !== undefined) {
      this.keys[key] = value;
    }
    return this.keys[key];
  }

  reset() {
    for (let key in this.keys) {
      this.keys[key] = false;
    }
  }
}
