import TileSprite from "../TileSprite";
import { Position } from "../models";
import { textures } from "../textures";
import math from "../utils/math";

export default class Squizz extends TileSprite {
  speed: number;
  rate: number = 0.1;
  currTime: number = 0;
  currFrame: number = 0;
  anchor: Position = {
    x: -16,
    y: -16
  }
  pivot: Position = {
    x: 32,
    y: 32
  }
  frames = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
  ];
  constructor() {
    super(textures.squizz, 32, 32);
    this.speed = math.rand(20, 100);
  }

  update(dt: number, t: number) {
    this.currTime += dt;
    if (this.currTime > this.rate) {
      this.frame = this.frames[this.currFrame++ % this.frames.length];
      this.currTime -= this.rate;
    }
    this.pos.x += dt * this.speed;
  }
}
