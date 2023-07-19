import Entity from "./Entity";
import { CELLSIZE } from "./constants";

export default class Bat extends Entity {
  constructor() {
    super();
    this.pos.x = CELLSIZE * 2;
    this.pos.y = CELLSIZE * 3;
  }
}
