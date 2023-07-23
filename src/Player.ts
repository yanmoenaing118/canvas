import KeyControls from "./KeyControls";
import TileSprite from "./TileSprite";
import { CELLSIZE, WORLD_H, WORLD_W } from "./constants";
import { clamp } from "./utils";

const texture = new Image();
texture.src = "spider10.png";
export default class Player extends TileSprite {
  speed = 640;
  constrols: KeyControls;
  constructor(controls: KeyControls) {
    const frame = { x: 0, y: 3 };
    super(texture, frame);
    this.constrols = controls;
    this.scale = { x: 1.5, y: 1.5}
  }

  update(dt: number, t: number): void {
    this.pos.x += this.constrols.x * dt * this.speed;
    this.pos.y += this.constrols.y * dt * this.speed;
    // this.pos.x += dt * this.speed;
    // this.pos.y +=  dt * this.speed;

    this.pos.x = clamp(this.pos.x, CELLSIZE, WORLD_W - this.w * 2 * this.scale.x);
    this.pos.y = clamp(this.pos.y, CELLSIZE, WORLD_H - this.h * this.scale.y);

    if(this.constrols.x || this.constrols.y) {
      this.frame.x = Math.floor(t * 12) % 5;
    }

    if(this.constrols.x < 0) {
      this.frame.y = 1;
    } else if(this.constrols.x > 0) {
      this.frame.y = 3;
    } else if(this.constrols.y > 0) {
      this.frame.y = 2;
    } else if(this.constrols.y < 0) {
      this.frame.y = 0;
    }
  }
}
