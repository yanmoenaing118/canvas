import RectMap from "./RectMap";
import { TileSpriteFrame } from "./classes";

export default class RectLevel extends RectMap {
  constructor(public w: number, public h: number) {
    const tileSize = 64;
    const mapW = (w / tileSize) | 0;
    const mapH = (h / tileSize) | 0;

    const ascii = `
############
#          #
#    RR    #
#          #
#RR        #
#          #
#         R#
GGGGGGGGGGGG`;

    const level: TileSpriteFrame[] = [];
    const cells = ascii
      .split("\n")
      .slice(1)
      .map((row) => row.split(""))
      .reduce((accu, prev) => [...accu, ...prev], []);

    cells.forEach((cell, i: number) => {
      const x = (i % mapW) * tileSize;
      const y = ((i / mapW) | 0) * tileSize;
      let color = "white";
      switch (cell) {
        case "R":
            color = "red"
            break;
        case "G":
            color = "gold";
            break;
        default:
            break;
      }
      level[i] = {
        x,
        y,
        color,
      };
    });
    super(level, mapW, mapH, tileSize, tileSize);
  }
}
