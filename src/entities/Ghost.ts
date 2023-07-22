import { CANVAS_HEIGHT, CANVAS_WIDTH, TILE_SIZE } from "../constants";
import Texture from "../pop/Texture";
import TileSprite from "../pop/TileSprite";
import { Position } from "../pop/models";
import math from "../pop/utils/math";
import Player from "./Player";

const texture = new Texture("./images/bravedigger-tiles.png");

export default class Ghost extends TileSprite {
  waypoint: Position = { x: 0, y: 0 };
  player: Player;
  speed = 50;

  constructor(player: Player) {
    super(texture, TILE_SIZE, TILE_SIZE);
    this.player = player;
    this.speed = player.speed * 0.1;
    this.frame = {
      x: 5,
      y: 1,
    };
    this.waypoint = this.makeWaypoint();
  }

  makeWaypoint() {
    return {
      x: Math.random() * CANVAS_WIDTH - this.w * 2,
      y: Math.random() * CANVAS_HEIGHT - this.h * 2,
    };
  }

  update(dt: number): void {
    const dx = this.player.pos.x - this.pos.x;
    const dy = this.player.pos.y - this.pos.y;
    const step = this.speed * dt;

    let mx = 0;
    let my = 0;

    mx = dx < 0 ? -step : step;
    my = dy < 0 ? -step : step;

    this.pos.x += mx;
    this.pos.y += my;
  }
}
