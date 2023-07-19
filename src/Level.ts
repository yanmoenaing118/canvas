import { ctx } from ".";
import Vec2 from "./Vec2";
import { CELLSIZE, HEIGHT, WIDTH } from "./constants";

export class Rect {
  pos: Vec2 = { x: 0, y: 0 };
  w: number = CELLSIZE;
  h: number = CELLSIZE;
  fill?: string = "black";
  solid: boolean = false;
  constructor(fill?: string) {
    this.fill = fill;
  }

  update(dt: number) {}

  render() {
    ctx.save();
    if (this.fill) {
      ctx.fillStyle = this.fill;
    }
    ctx.translate(this.pos.x, this.pos.y);
    ctx.fillRect(0, 0, this.w, this.h);
    ctx.restore();
  }
}

class Level {
  tiles: Rect[] = [];
  cols: number = WIDTH / CELLSIZE;
  rows: number = HEIGHT / CELLSIZE;
  solid_tiles_index: number[] = [];
  w: number = this.cols * CELLSIZE;
  h: number = this.rows * CELLSIZE;

  constructor() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const index = row * this.cols + col;
        let fill = "lightgreen";

        const x = col * CELLSIZE;
        const y = row * CELLSIZE;
        const rect = new Rect(fill);
        rect.pos.x = x;
        rect.pos.y = y;

        if (this.solid_tiles_index.includes(index)) {
          rect.fill = "pink";
          rect.solid = true;
        }

        this.tiles.push(rect);
      }
    }
  }

  /**
   * giving the pixel positon (x,y) get map postion (x,y)
   * @param x pixel positon
   * @param y pixel position
   */
  getMapXY(x: number, y: number) {
    return new Vec2(x / CELLSIZE, y / CELLSIZE);
  }

  getTileAtMapXY(x: number, y: number) {
    return this.tiles[y * this.cols + x];
  }

  update() {}

  render() {
    this.tiles.forEach((r) => {
      r.render();
    });
  }
}

export default Level;
