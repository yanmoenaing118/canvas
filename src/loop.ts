import { canvas, ctx } from "./canvas";

let dt = 0;
let t = 0;

export default function renderUpdate(
  render: (ctx: CanvasRenderingContext2D) => void,
  update: (dt: number, t: number) => void,
  clear = true
) {
  function loop(ellapsedTime: number) {
    dt = (ellapsedTime - t) * 0.001;
    t = ellapsedTime;

    if (clear) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    render(ctx);
    update(dt, t);

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}
