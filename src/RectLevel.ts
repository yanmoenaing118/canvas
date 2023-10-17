import RectMap from "./RectMap";
import { colors } from "./canvas";
import { TileSpriteFrame, Vec2 } from "./classes";

export default class RectLevel extends RectMap {
  spwans: {
    [key: string]: Vec2;
  } = {};

  constructor(public w: number, public h: number) {
    const tileSize = 64;
    const mapW = (w / tileSize) | 0;
    const mapH = (h / tileSize) | 0;

    const ascii = `
#####R###R##
#    R   R #
#R   RR    #
#R   R     #
#R         #
#       R  #
#P   R    R#
GGGGGGGGGGGG`;

    let spwans: { [key: string]: Vec2 } = {};
    const level: TileSpriteFrame[] = [];
    const cells = ascii
      .split("\n")
      .slice(1)
      .map((row) => row.split(""))
      .reduce((accu, prev) => [...accu, ...prev], []);

    cells.forEach((cell, i: number) => {
      const x = (i % mapW) * tileSize;
      const y = ((i / mapW) | 0) * tileSize;
      let color = colors[cell];
      if (cell === "P") {
        spwans["player"] = new Vec2(x, y);
        color = 'black';
      }
      level[i] = {
        x,
        y,
        color,
      };
    });
    super(level, mapW, mapH, tileSize, tileSize);
    this.spwans = spwans;
  }
}
