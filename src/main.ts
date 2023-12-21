import renderGrid from "./Grid";
import Walker from "./Walker";
import { h, w } from "./canvas";
import renderUpdate from "./loop";
import { SimpleRandomGenerator } from "./utils";

const walker = new Walker(h / 2, w / 2);
const random = new SimpleRandomGenerator(100);

function update(dt: number, t: number) {
  walker.update(dt);
}

function render(ctx: CanvasRenderingContext2D) {
  // renderGrid(ctx, w, h, 64 * 0.5);
  walker.render(ctx);
}

renderUpdate(render, update, false);
