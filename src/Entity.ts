import Camera from "./Camera";
import Rect from "./Rect";
import Vec2 from "./Vec2";
import { CELLSIZE } from "./constants";
import { Styles } from "./interfaces";

export default class Entity {
  pos: Vec2;
  anchor: Vec2;
  scale: Vec2;
  rotation: number;
  style: Styles;
  w: number;
  h: number;
  constructor() {
    this.pos = { x: 0, y: 0 };
    this.anchor = { x: 0, y: 0 };
    this.scale = { x: 1, y: 1 };
    this.rotation = 0;
    this.style = {};
    this.w = CELLSIZE;
    this.h = CELLSIZE;
  }

  update(dt: number, t: number): void {}

}
