import RectMap from "./RectMap";
import { colors } from "./canvas";
import { TileSpriteFrame, Vec2 } from "./classes";

export default class RectLevel extends RectMap {
  spwans: {
    [key: string]: Vec2;
  } = {};

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













    

  update(dt: number, t: number) {

    /**
     * My Calm and Steady Heart
     */
    this.calm();


    /**
     * My Heart beating 
     * when I see your photos
     */
    this.shake(dt, t);
  }













  calm() {
    this.children.forEach((item) => {
      item.scale.x = 1;
      item.scale.y = 1;
    });
  }

  shake(dt: number, t: number) {
    this.children.forEach((item) => {
      item.scale.x = Math.sin(t * -3) + 0.5;
      item.scale.y = Math.cos(t * 0.5);
    });
  }
}
