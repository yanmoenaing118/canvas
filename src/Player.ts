import Entity from "./Entity";
import KeyControls from "./KeyControls";
import Level from "./Level";
import { CELL_HEIGH, CELL_WIDTH, HEIGHT, WIDTH } from "./constants";
import { bounds, clamp } from "./helpers";

export default class Player extends Entity {
  speed: number = 640;
  controls: KeyControls;
  map: Level;
  constructor(controls: KeyControls, map: Level) {
    super(CELL_WIDTH, CELL_HEIGH, "rgba(89,90,12,0.3)");
    this.map = map;
    this.controls = controls;

    // offset for hit box
    const ox = 0;
    const oy = 0;
    this.hitBox = {
      x: ox,
      y: oy,
      w: this.w - ox * 2,
      h: this.h - oy * 2,
    };
    this.debugMode = true;
    this.pos.y = this.h * 4;
    this.pos.x = this.w * 2;
  }

  update(dt: number, t: number) {
    let mx = this.controls.x * dt * this.speed;
    let my = this.controls.y * dt * this.speed;

    const newX = this.pos.x + mx;
    const newY = this.pos.y + my;
    const b = bounds({ ...this, pos: { ...this.pos, x: newX, y: newY } });
    const tilesAtCorners = this.map.getTileAtCorners(b);

    try {
      if (tilesAtCorners.some((t) => t && t.fill === "pink")) {
        if (this.controls.x) {
          if (tilesAtCorners[1] && tilesAtCorners[0]) {
            if (this.controls.x > 0) {
              mx = tilesAtCorners[1].pos.x - (this.pos.x + this.w);
            } else {
              mx = -(this.pos.x - (tilesAtCorners[0].pos.x + this.w));
            }
          }
        }

        if (this.controls.y) {
          if (tilesAtCorners[2] && tilesAtCorners[0]) {
            if (this.controls.y > 0) {
              my = tilesAtCorners[2].pos.y - (this.pos.y + this.h);
            } else {
              my = -(this.pos.y - (tilesAtCorners[0].pos.y + this.h));
            }
          }
        }

        // my = 0;
      }
    } catch (error) {
      console.log(tilesAtCorners);
      console.log(error);
    }

    // console.log(JSON.stringify(tilesAtCorners));

    this.pos.x += mx;
    this.pos.y += my;

    this.pos.x = clamp(this.pos.x, 0, WIDTH - this.w);
    this.pos.y = clamp(this.pos.y, 0, HEIGHT - this.h);
  }
}
