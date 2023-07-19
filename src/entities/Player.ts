import { TILE_SIZE } from "../constants";
import AnimationManager from "../pop/AnimationManager";
import Texture from "../pop/Texture";
import TileSprite from "../pop/TileSprite";
import KeyControls from "../pop/controls/KeyControls";
import entities from "../pop/utils/entities";
import Dungeon from "./Dungeon";

class Player extends TileSprite {
  speed = 0.1525;
  controls: KeyControls;
  map: Dungeon;
  constructor(controls: KeyControls, map: Dungeon) {
    const texture = new Texture("./images/bravedigger-tiles.png");
    super(texture, TILE_SIZE, TILE_SIZE);
    this.controls = controls;
    this.anims = new AnimationManager(this);
    this.map = map;

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

    const mx = x * this.speed * dt;
    const my = y * this.speed * dt;

    const b = entities.bounds(this);
    const tilesAtCorners = this.map.tilesAtCorners(b,mx, my);




    if (x) {
      this.scale.x = x;
      this.anchor.x = x > 0 ? 0 : 48;
    } 

    if(x || y) {
        this.anims.play('walk');
    } else {
        this.anims.play('hangout')
    }

    this.pos.x += x * (1 / this.speed);
    this.pos.y += y * (1 / this.speed);
  }
}

export default Player;
