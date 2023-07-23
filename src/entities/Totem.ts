import { TILE_SIZE } from "../constants";
import Texture from "../pop/Texture";
import TileSprite from "../pop/TileSprite";
import { Position } from "../pop/models";
const texture = new Texture("images/bravedigger-tiles.png");

export default class Totem extends TileSprite {
  constructor(pos: Position) {
    super(texture, TILE_SIZE, TILE_SIZE);
    this.pos = pos;
    this.frame = {
      x: 0,
      y: 1,
    };
  }
}
