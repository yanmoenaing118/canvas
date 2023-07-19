import { ctx } from ".";
import Entity from "./Entity";
import { CELLSIZE } from "./constants";


export default class Bat extends Entity {
  constructor() {
    super();
    this.pos.x = CELLSIZE * 2;
    this.pos.y = CELLSIZE * 3;
  }


  render() {
    ctx.save();
    ctx.fillStyle = "pink";
    ctx.translate(this.pos.x, this.pos.y);
    ctx.fillRect(0, 0, this.w, this.h);
    ctx.restore();
  }
}
