import Container from "./Container";
import CanvasRenderer from "./renderer/CanvasRenderer";

const STEP = 1 / 60;
const MAX_FRAME = STEP * 5;

export default class Game {
  w: number;
  h: number;
  renderer: CanvasRenderer;
  scene: Container;
  constructor(w: number, h: number, parent: string = "#board") {
    this.w = w;
    this.h = h;
    this.renderer = new CanvasRenderer(w, h);
    const parentEl = document.querySelector(parent) as HTMLElement;
    parentEl.appendChild(this.renderer.view);
    this.scene = new Container();
  }

  run(gameUpdate = (dt: number, t: number) => {}) {
    let dt = 0;
    let last = 0;
    const loopy = (ms: number) => {
      requestAnimationFrame(loopy);
      const t = ms / 1000; // Let's work in seconds
      dt = Math.min(t - last, MAX_FRAME);
      last = t;
      this.scene.update(dt, t);
      gameUpdate(dt, t);
      this.renderer.render(this.scene, false);
    };
    requestAnimationFrame(loopy);
  }
}
