import { CANVAS_HEIGHT, CANVAS_WIDTH, TILE_SIZE } from "../constants";
import Texture from "../pop/Texture";
import TileSprite from "../pop/TileSprite";
import { Position } from "../pop/models";

const texture = new Texture("./images/bravedigger-tiles.png");

export default class Bat extends TileSprite {
  waypoint: Position;
  speed = 75;

  constructor() {
    super(texture, TILE_SIZE, TILE_SIZE);
    // this.frame = {x: 3, y: 1};
    this.anims.add(
      "fly",
      [
        {
          x: 3,
          y: 1,
        },
        {
          x: 4,
          y: 1,
        },
      ],
      0.15
    );
    this.anims.play('fly');
    this.pos = this.makeWaypoint();
    this.waypoint = this.makeWaypoint();
  }

  makeWaypoint() {
    return {
      x: Math.random() * (CANVAS_WIDTH - this.w ),
      y: Math.random() * (CANVAS_HEIGHT - this.h ),
    };
  }

  update(dt: number): void {
    this.anims.update(dt);
    const dx = this.waypoint.x - this.pos.x;
    const dy = this.waypoint.y - this.pos.y;
    const step = this.speed * dt;
    let isXClose = Math.abs(dx) <= step;
    let isYClose = Math.abs(dy) <= step;

    if (!isXClose) {
      this.pos.x += this.speed * (dx > 0 ? 1 : -1) * dt;
    }

    if (!isYClose) {
      this.pos.y += this.speed * (dy > 0 ? 1 : -1) * dt;
    }

    if(isXClose && isYClose) {
      this.waypoint = this.makeWaypoint();
    }
  }
}
