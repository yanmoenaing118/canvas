import { CANVAS_HEIGHT, CANVAS_WIDTH, TILE_SIZE } from "../constants";
import AnimationManager from "../pop/AnimationManager";
import Texture from "../pop/Texture";
import TileSprite from "../pop/TileSprite";
import KeyControls from "../pop/controls/KeyControls";
import entities from "../pop/utils/entities";
import math from "../pop/utils/math";
import Dungeon from "./Dungeon";

class Player extends TileSprite {
  speed = 2500;
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

    let mx = x * this.speed * dt;
    let my = y * this.speed * dt;

    const bounds = entities.bounds(this);
    const tilesAtCorners = this.map.tilesAtCorners(bounds, mx, my);

    const framesInfo = tilesAtCorners.map((t) => t && t.frame);
    const blocked = tilesAtCorners.some((t) => t && !t.frame.walkable);
    let tileEdge = 0;

    if (blocked) {
      const [TL, TR, BL, BR] = tilesAtCorners.map((t) => t && t.frame.walkable);
      if ( x > 0 && !(TR && BR)) {
        tileEdge = tilesAtCorners[1].pos.x - (bounds.x + bounds.w - 1);
        mx = tileEdge;
      } else if ( x < 0 && !(TL && BL)) {
        tileEdge = (tilesAtCorners[0].pos.x + tilesAtCorners[0].w) - bounds.x;
        mx = tileEdge;
      } 
      if (y) {
      }
    }

    // console.log(JSON.stringify(framesInfo));

    if (x) {
      this.scale.x = x;
      this.anchor.x = x > 0 ? 0 : 48;
    }

    // if(x || y) {
    //     this.anims.play('walk');
    // } else {
    //     this.anims.play('hangout')
    // }

    this.pos.x += mx;
    this.pos.y += my;

    this.pos.x = math.clamp(this.pos.x, 0, CANVAS_WIDTH - this.w);
    this.pos.y = math.clamp(this.pos.y, 0, CANVAS_HEIGHT - this.h);
  }
}

export default Player;
