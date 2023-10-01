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
  frameX = 0;
  willFireHintRate = 0.2;
  constructor(
    target: TileSprite,
    pos: Position,
    onFire: (...arg: any) => void
  ) {
    super(texture, TILE_SIZE, TILE_SIZE);
    this.pos = pos;
    this.frame = {
      x: this.frameX,
      y: 1,
    };
    this.target = target;
    this.onFire = onFire;
  }

  fireTarget() {
    const totemPos = entities.center(this);
    const targetPos = entities.center(this.target);
    const angleToPlayer = entities.angle(targetPos, totemPos);

    const x = Math.cos(angleToPlayer);
    const y = Math.sin(angleToPlayer);
    const bullet = new Bullet({ x, y }, 250);
    bullet.pos.x = totemPos.x - bullet.w/2;
    bullet.pos.y = totemPos.y - bullet.h/2;

    this.onFire(bullet);
  }

  update(dt: number): void {
    if ((this.fireIn -= dt) < 0) {
      this.fireIn = 3;
      this.fireTarget();
    }

    if(this.fireIn <= 1) {
      
      if((this.willFireHintRate -= dt ) < 0) {
        this.willFireHintRate = 0.2;
        this.frame.x = this.frameX++ % 2;
      }
    }
  }
}