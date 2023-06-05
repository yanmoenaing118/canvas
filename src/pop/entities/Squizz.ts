import Texture from "../Texture";
import TileSprite from "../TileSprite";
import KeyControls from "../controls/KeyControls";
import { Position } from "../models";
import { textures } from "../textures";
import math from "../utils/math";

export default class Squizz extends TileSprite {
  pos: Position = {
    x: 0,
    y: 0,
  };
  anchor: Position = {
    x: -16,
    y: -16,
  };
  pivot: Position = {
    x: 32,
    y: 32,
  };
  controls: KeyControls;

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

    this.anims.add(
      "up",
      [0, 1, 2, 3].map((i) => {
        return { x: i, y: 1 };
      }),
      0.1
    );
  }

  update(dt: number, t: number): void {
    this.pos.x += dt * 400 * this.controls.x;
    this.pos.y += dt * 400 * this.controls.y;
    if (this.controls.x || this.controls.y) {
      this.anims.play("walk");
    } else {
      this.anims.play("up");
    }
    this.anims.update(dt);
  }
}
