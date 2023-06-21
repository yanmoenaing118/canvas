import KeyControls from "./KeyControls";
import TileSprite from "./TileSprite";
import { CELLSIZE } from "./constants";

const spiderImg = new Image();
spiderImg.src = "spider10.png";

export default class Spider extends TileSprite {
  controls: KeyControls;
  speed: number = 320;
  constructor(controls: KeyControls) {
    super(spiderImg, CELLSIZE, CELLSIZE);
    this.controls = controls;
  }

  update(dt: number, t: number): void {
      this.pos.x += dt * this.controls.x * this.speed;
      this.pos.y += dt * this.controls.y * this.speed;
  }
}
