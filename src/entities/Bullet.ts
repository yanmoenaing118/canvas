import { TILE_SIZE } from "../constants";
import Texture from "../pop/Texture";
import TileSprite from "../pop/TileSprite";
import { Position } from "../pop/models";
const texture = new Texture("images/bravedigger-tiles.png");
export default class Bullet extends TileSprite {
  speed: number;
  dir: Position;
  life: number;
  constructor(dir: Position, speed = 100) {
    super(texture, TILE_SIZE, TILE_SIZE);
    this.frame = { x: 4, y: 2 };
    this.speed = speed;
    this.dir = dir;
    this.life = 3;
  }

  update(dt: number): void {
    this.pos.x += this.dir.x * dt * this.speed;
    this.pos.y += this.dir.y * dt * this.speed;

    if((this.life -= dt) < 0) {
        this.dead = true;
    }
  }
}
