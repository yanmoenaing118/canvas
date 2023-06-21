import Sprite from "./Sprite";
import { Frame } from "./types";

export default class TileSprite extends Sprite {
  tileW: number;
  tileH: number;
  frame: Frame;
  constructor(img: HTMLImageElement, w: number, h: number, frame?: Frame) {
    super(img, w, h);
    this.tileW = w;
    this.tileH = h;
    this.frame = frame || { x: 0, y: 0};
  } 
}
