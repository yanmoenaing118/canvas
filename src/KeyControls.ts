export class KeyControls {
  keys = new Map();
  constructor() {
    document.addEventListener("keydown", (e: KeyboardEvent) => {
      console.log(e.code);
      this.keys.set(e.code, true);
    });
    document.addEventListener("keyup", (e: KeyboardEvent) => {
      this.keys.set(e.code, false);
    });
  }

  public get x(): number {
    if (this.keys.get("KeyA") || this.keys.get("ArrowLeft")) return -1;
    if (this.keys.get("KeyD") || this.keys.get("ArrowRight")) return 1;
    return 0;
  }

  public get y(): number {
    if (this.keys.get("KeyW") || this.keys.get("ArrowUp")) return -1;
    if (this.keys.get("KeyS") || this.keys.get("ArrowDown")) return 1;
    return 0;
  }
}
