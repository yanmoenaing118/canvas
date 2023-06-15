import KeyControls from "./KeyControls";

export default class Player {
  controls: KeyControls;
  pos: { x: number; y: number } = { x: 0, y: 0 };
  w: number;
  h: number;
  speed: number = 200;
  constructor(w: number, h: number, controls: KeyControls) {
    this.controls = controls;
    this.w = w;
    this.h = h;
  }

  update(dt: number) {
    this.pos.x += dt * this.controls.x * this.speed;
    this.pos.y += dt * this.controls.y * this.speed;
  }

  render(context: CanvasRenderingContext2D) {
    context.save();
    context.fillStyle = "blue";
    context.translate(this.pos.x, this.pos.y);
    context.fillRect(0, 0, this.w, this.h);
    context.restore();
  }
}
