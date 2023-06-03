import TileSprite from "../TileSprite";
import { Position } from "../models";
import { textures } from "../textures";
import math from "../utils/math";

export default class Squizz extends TileSprite {
  anchor: Position = {
    x: -16,
    y: -16
  }
  pivot: Position = {
    x: 32,
    y: 32
  }

  constructor() {
    super(textures.squizz, 32, 32);
  }
}
