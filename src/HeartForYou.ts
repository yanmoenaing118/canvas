import RectMap from "./RectMap";
import { colors, w } from "./canvas";
import { TileSpriteFrame, Vec2 } from "./classes";

export default class RectLevel extends RectMap {
  spwans: {
    [key: string]: Vec2;
  } = {};

  rate = 1;
  crrRate = 0;
  msg = "Seeing Others 😃";

  constructor(public w: number, public h: number) {
    const tileSize = 32;
    const mapW = (w / tileSize) | 0;
    const mapH = (h / tileSize) | 0;

    const data = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 651, 651, 651, 0, 0, 0, 0, 0, 651, 651, 651, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 651, 651, 651, 651, 651, 0, 0, 0, 651, 651,
      651, 651, 651, 0, 0, 0, 0, 0, 0, 0, 0, 651, 651, 651, 651, 651, 651, 651,
      0, 651, 651, 651, 651, 651, 651, 651, 0, 0, 0, 0, 0, 0, 0, 651, 651, 651,
      651, 651, 651, 651, 651, 651, 651, 651, 651, 651, 651, 651, 0, 0, 0, 0, 0,
      0, 0, 651, 651, 651, 651, 651, 651, 651, 651, 651, 651, 651, 651, 651,
      651, 651, 0, 0, 0, 0, 0, 0, 0, 651, 651, 651, 651, 651, 651, 651, 651,
      651, 651, 651, 651, 651, 651, 651, 0, 0, 0, 0, 0, 0, 0, 651, 651, 651,
      651, 651, 651, 651, 651, 651, 651, 651, 651, 651, 651, 651, 0, 0, 0, 0, 0,
      0, 0, 0, 651, 651, 651, 651, 651, 651, 651, 651, 651, 651, 651, 651, 651,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 651, 651, 651, 651, 651, 651, 651, 651, 651,
      651, 651, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 651, 651, 651, 651, 651,
      651, 651, 651, 651, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 651, 651,
      651, 651, 651, 651, 651, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      651, 651, 651, 651, 651, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 651, 651, 651, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];
    let spwans: { [key: string]: Vec2 } = {};
    const level: TileSpriteFrame[] = [];

    data.forEach((item, i) => {
      const x = (i % mapW) * tileSize;
      const y = ((i / mapH) | 0) * tileSize;
      if (item === 651) {
        level.push({ x, y, color: "red" });
      }
    });

    super(level, mapW, mapH, tileSize, tileSize);
    this.spwans = spwans;

    const moveBack = 80;
    this.children.forEach((rect) => {
      rect.pos.x -= moveBack;
      rect.pos.y -= moveBack;
    });
  }

  renderText(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(w * 0.25, 100);
    ctx.font = "28px arial";
    ctx.fillStyle = "green";
    ctx.fillText(this.msg, 0, 0);
    ctx.restore();
  }

  render(ctx: CanvasRenderingContext2D) {
    this.renderText(ctx)
    super.render(ctx);
  }





  

  update(dt: number, t: number) {
    /**
     * Seeing Others
     */
    // this.calm();

    /**
     * Seeing you
     */
    // this.shake(dt, t);
  }











  calm() {
    this.msg = "Seeing Others 😃";
    this.children.forEach((item) => {
      item.scale.x = 1;
      item.scale.y = 1;
    });
  }

  shake(dt: number, t: number) {
    this.msg = "Seeing you 💖";
    if ((this.crrRate += dt) < this.rate) {
      this.children.forEach((item) => {
        item.scale.x = Math.sin(t * 0.05) + 0.5;
        item.scale.y = Math.cos(t * 0.05) + 0.5;
      });
    } else {
      this.crrRate -= this.rate;
    }
  }
}
