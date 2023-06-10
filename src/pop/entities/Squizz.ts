import Texture from "../Texture";
import TileSprite from "../TileSprite";
import KeyControls from "../controls/KeyControls";
import { Position } from "../models";

export default class Squizz extends TileSprite {
  pos: Position = {
    x: 0,
    y: 0,
  };
  anchor: Position = {
    x: 0,
    y: 0,
  };
  pivot: Position = {
    x: 0,
    y: 0,
  };
  controls: KeyControls;
  dir: Position = {
    x: 1,
    y: 0,
  };
  speed: number = 0.15;
  nextCell: number = this.speed;

  constructor(controls: KeyControls) {
    super(new Texture("./images/player-walk.png"), 32, 32);
    this.controls = controls;

    this.anims.add(
      "walk",
      [0, 1, 2, 3].map((i) => {
        return { x: i, y: 0 };
      }),
      0.1
    );
    this.anims.play('walk')
    this.nextCell = this.speed;
  }

  update(dt: number): void {
    // super.update(dt);

    if ((this.nextCell -= dt) <= 0) {
      this.nextCell += this.speed;
      if (this.controls.x && this.controls.x != this.dir.x) {
        this.dir.x = this.controls.x;
        this.dir.y = 0;
        this.pos.y = Math.round(this.pos.y / 32) * 32;
      } else if (this.controls.y && this.controls.y != this.dir.y) {
        this.dir.y = this.controls.y;
        this.dir.x = 0;
        this.pos.x = Math.round(this.pos.x / 32) * 32;
      }
    }


    this.pos.x += this.dir.x * dt * (32 / this.speed);
    this.pos.y += this.dir.y * dt * (32 / this.speed);
  }
}
