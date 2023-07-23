import { TILE_SIZE } from "../constants";
import Texture from "../pop/Texture";
import TileSprite from "../pop/TileSprite";
import { Position } from "../pop/models";
import entities from "../pop/utils/entities";
import math from "../pop/utils/math";
import Bullet from "./Bullet";
import Player from "./Player";
const texture = new Texture("images/bravedigger-tiles.png");

export default class Totem extends TileSprite {
  onFire: (...arg: any) => void;
  target: TileSprite;
  fireIn = 3;
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
      y: Math.sign(angleToPlayer),
    };
    const bullet = new Bullet(dir);
    bullet.pos.x = this.pos.x;
    bullet.pos.y = this.pos.y;
    this.onFire(bullet);
  }

  update(dt: number): void {
    if ((this.fireIn -= dt) < 0) {
      this.fireIn = 3;
      this.fireTarget();
    }
  }
}
