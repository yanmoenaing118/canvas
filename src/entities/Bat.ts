import { CANVAS_HEIGHT, CANVAS_WIDTH, TILE_SIZE } from "../constants";
import Texture from "../pop/Texture";
import TileSprite from "../pop/TileSprite";
import { Entity, Position } from "../pop/models";
import entities from "../pop/utils/entities";
import math from "../pop/utils/math";
import Player from "./Player";

const texture = new Texture("./images/bravedigger-tiles.png");
const states = {
  ATTACK: 0,
  AVADE: 1,
  WANDER: 2,
};

export default class Bat extends TileSprite {
  waypoint: Position;
  speed = 75;
  state = states.ATTACK;
  target: Player;

  constructor(target: Player) {
    super(texture, TILE_SIZE, TILE_SIZE);
    // this.frame = {x: 3, y: 1};
    this.target = target;
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
    this.anims.play("fly");
    this.pos = this.makeWaypoint();
    this.waypoint = this.makeWaypoint();
  }

  makeWaypoint() {
    return {
      x: Math.random() * (CANVAS_WIDTH - this.w),
      y: Math.random() * (CANVAS_HEIGHT - this.h),
    };
  }

  update(dt: number): void {
    this.anims.update(dt);
    const { state } = this;

    const angle = entities.angle(
      entities.center(this.target),
      entities.center(this)
    );
    const distance = entities.distance(this, this.target as Entity);

    let ox = 0;
    let oy = 0;

    if (state === states.ATTACK) {
      ox = Math.cos(angle) * dt * this.speed;
      oy = Math.sin(angle) * dt * this.speed;

      if (distance < 60) {
        this.state = states.AVADE;
      }
    } else if (state === states.AVADE) {
      ox = -(Math.cos(angle) * dt * this.speed);
      oy = -(Math.cos(angle) * dt * this.speed);

      if (distance > 120) {
        if (math.randOneIn(2)) {
          this.state = states.WANDER;
          this.waypoint = {
            x: this.pos.x + math.rand(-200, 200),
            y: this.pos.y + math.rand(-200, 200),
          };
        } else {
          this.state = states.ATTACK;
        }
      }
    } else if (state === states.WANDER) {
      const waypointAngle = entities.angle(this.waypoint, this.pos);
      const waypointDistance = math.distance(this.pos, this.waypoint);

      ox = Math.cos(waypointAngle) * this.speed * dt;
      oy = Math.sin(waypointAngle) * this.speed * dt;
      if (waypointDistance < 60) {
        this.state = states.AVADE;
      }
    }

    console.log(angle);
    // console.log(ox, oy)
    this.pos.x += ox;
    this.pos.y += oy;
  }
}
