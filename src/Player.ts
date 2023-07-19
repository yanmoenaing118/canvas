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
    super(CELL_WIDTH, CELL_HEIGH, "rgba(10,200,12,0.3)");
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
    this.pos.x = 1;
    this.pos.y = this.h * this.map.mapH;
  }

  update(dt: number, t: number) {
    let mx = this.controls.x * dt * this.speed;
    let my = this.controls.y * dt * this.speed;

    const newX = this.pos.x + mx;
    const newY = this.pos.y + my;
    const b = bounds({ ...this, pos: { ...this.pos, x: newX, y: newY } });
    const tilesAtCorners = this.map.getTileAtCorners(b);
    const [TL, TR, BL, BR] = tilesAtCorners;
    const blocked = tilesAtCorners.some((tile) => tile && tile.fill === "pink");

    /**
     * for horizontal we only worry about controls.x
     * for vertical we only worry about controls.y
     */

    if (blocked) {
      mx = 0;
      my = 0;

      if (this.controls.x && TL && TR) {
        if (this.controls.x > 0) {
          mx = TR.pos.x - (this.pos.x + this.w);
        } else {
          mx = -(this.pos.x - (TL.pos.x + this.w));
        }
      }
    }

    console.log(
      JSON.stringify({
        TL,
        TR,
        BL,
        BR,
      })
    );

    this.pos.x += mx;
    this.pos.y += my;

    this.pos.x = clamp(this.pos.x, 0, WIDTH - this.w);
    this.pos.y = clamp(this.pos.y, 0, HEIGHT - this.h);

    if(this.pos.x === 0) {
      debugger
    }
  }
}
