import { TILE_SIZE } from "../constants";
import AnimationManager from "../pop/AnimationManager";
import Texture from "../pop/Texture";
import TileSprite from "../pop/TileSprite";
import KeyControls from "../pop/controls/KeyControls";

class Player extends TileSprite {
  speed = 0.1525;
  controls: KeyControls;
  constructor(controls: KeyControls) {
    const texture = new Texture("./images/bravedigger-tiles.png");
    super(texture, TILE_SIZE, TILE_SIZE);
    this.controls = controls;
    this.anims = new AnimationManager(this);

    this.anims.add(
      "walk",
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 },
      ],
      this.speed
    );

    this.anims.add(
      "hangout",
      [
        { x: 4, y: 0 },
        { x: 5, y: 0 },
      ],
      0.3
    );
    this.anims.play("hangout");
  }

  update(dt: number): void {
    this.anims.update(dt);

    const { x, y } = this.controls;

    if (x) {
      this.scale.x = x;
      this.anchor.x = x > 0 ? 0 : 48;
      this.anims.play("walk");
    } else {
      this.anims.play("hangout");
    }

    this.pos.x += x * (1 / this.speed);




    console.log(1/this.speed)
  }
}

export default Player;
