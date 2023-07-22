import { TILE_SIZE } from "../constants";
import Texture from "../pop/Texture";
import TileSprite from "../pop/TileSprite";
import { Position } from "../pop/models";
import Player from "./Player";

const texture = new Texture("./images/bravedigger-tiles.png");

export default class Ghost extends TileSprite {
  waypoint: Position = { x: 0, y: 0 };
  player: Player;
  speed = 220;

  constructor(player: Player) {
    super(texture, TILE_SIZE, TILE_SIZE);
    this.player = player;
    this.frame = {
      x: 5,
      y: 1,
    };
  }

  update(dt: number): void {
    const dx = this.player.pos.x - this.pos.x;
    const dy = this.player.pos.y - this.pos.y;
    const step = this.speed * dt;

    if (dx === 0 || dy === 0) {
    }

    this.pos.x += step;
    this.pos.y += step;
  }
}
