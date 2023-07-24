import { CANVAS_HEIGHT, CANVAS_WIDTH, TILE_SIZE } from "../constants";
import AnimationManager from "../pop/AnimationManager";
import Texture from "../pop/Texture";
import TileSprite from "../pop/TileSprite";
import KeyControls from "../pop/controls/KeyControls";
import entities from "../pop/utils/entities";
import math from "../pop/utils/math";
import Dungeon from "./Dungeon";

class Player extends TileSprite {
  speed = 320;
  controls: KeyControls;
  map: Dungeon;
  hitBox = {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
  };
  constructor(controls: KeyControls, map: Dungeon) {
    const texture = new Texture("./images/bravedigger-tiles.png");
    super(texture, TILE_SIZE, TILE_SIZE);
    this.hitBox = {
      x: 2,
      y: 2,
      w: this.w - 2 * 2,
      h: this.h - 2 * 2,
    };
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
        { x: 4, y: 0 },
        { x: 5, y: 0 },
      ],
      0.1
    );

    this.anims.add(
      "hangout",
      [
        { x: 4, y: 0 },
        { x: 5, y: 0 },
      ],
      0.3
    );
    this.anims.play("walk");
  }

  update(dt: number): void {
    this.anims.update(dt);

    const { x, y } = this.controls;

    let mx = x * this.speed * dt;
    let my = y * this.speed * dt;

    const bounds = entities.bounds(this);
    const tilesAtCorners = this.map.tilesAtCorners(bounds, mx, my);

    const blocked = tilesAtCorners.some((t) => t && !t.frame.walkable);

    if (blocked) {
      const [TL, TR, BL, BR] = tilesAtCorners.map((t) => t && t.frame.walkable);

      if (y) {
        if (y > 0 && !(BL && BR)) {
          my = tilesAtCorners[2].pos.y - 1 - (bounds.y + bounds.h);
        } else if (y < 0 && !(TL && TR)) {
          my = tilesAtCorners[0].pos.y + tilesAtCorners[0].h - bounds.y;
        }
      }

      if (x > 0 && !(TR && BR)) {
        mx = tilesAtCorners[1].pos.x - 1 - (bounds.x + bounds.w);
      } else if (x < 0 && !(TL && BL)) {
        mx = tilesAtCorners[0].pos.x + tilesAtCorners[0].w - bounds.x;
      }
      
    }
    if (x) {
      this.scale.x = x;
      this.anchor.x = x > 0 ? 0 : 48;
    }

    if (x || y) {
      this.anims.play("walk");
    } else {
      this.anims.play("hangout");
    }

    this.pos.x += mx;
    this.pos.y += my;

    this.pos.x = math.clamp(this.pos.x, 0, CANVAS_WIDTH - this.w);
    this.pos.y = math.clamp(this.pos.y, 0, CANVAS_HEIGHT - this.h);
  }
}

export default Player;
