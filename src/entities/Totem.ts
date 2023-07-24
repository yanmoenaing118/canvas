import { TILE_SIZE } from "../constants";
import Texture from "../pop/Texture";
import TileSprite from "../pop/TileSprite";
import { Position } from "../pop/models";
import entities from "../pop/utils/entities";
import Bullet from "./Bullet";
const texture = new Texture("images/bravedigger-tiles.png");

export default class Totem extends TileSprite {
  onFire: (...arg: any) => void;
  target: TileSprite;
  fireIn = 5;
  constructor(
    target: TileSprite,
    pos: Position,
    onFire: (...arg: any) => void
  ) {
    super(texture, TILE_SIZE, TILE_SIZE);
    this.pos = pos;
    this.frame = {
      x: 0,
      y: 1,
    };
    this.target = target;
    this.onFire = onFire;
  }

  fireTarget() {
    const totemPos = entities.center(this);
    const targetPos = entities.center(this.target);
    const angleToPlayer = entities.angle(targetPos, totemPos);
    console.log(angleToPlayer)
    const dir = {
      x: Math.cos(angleToPlayer),
      y: Math.sin(angleToPlayer),
    };
    const bullet = new Bullet(dir);
    bullet.pos.x = totemPos.x - bullet.w/2;
    bullet.pos.y = totemPos.y - bullet.h/2;

    this.onFire(bullet);
  }

  update(dt: number): void {
    if ((this.fireIn -= dt) < 0) {
      this.fireIn = 3;
      this.fireTarget();
    }
  }
}
