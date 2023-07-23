import KeyControls from "./KeyControls";
import TileSprite from "./TileSprite";
import { CELLSIZE, WORLD_H, WORLD_W } from "./constants";
import { clamp } from "./utils";

const texture = new Image();
texture.src = "spider10.png";
export default class Player extends TileSprite {
  speed = 320;
  constrols: KeyControls;
  constructor(controls: KeyControls) {
    const frame = { x: 0, y: 0 };
    super(texture, frame);
    this.constrols = controls;
  }

  update(dt: number, t: number): void {
    // this.pos.x += this.constrols.x * dt * this.speed;
    this.pos.y += this.constrols.y * dt * this.speed;
    this.pos.x += dt * this.speed;
    // this.pos.y +=  dt * this.speed;

    this.pos.x = clamp(this.pos.x, CELLSIZE, WORLD_W - this.w * 2);
    this.pos.y = clamp(this.pos.y, CELLSIZE, WORLD_H - this.h * 2);
  }
}
