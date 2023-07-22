import { TILE_SIZE } from "../constants";
import Texture from "../pop/Texture";
import TileSprite from "../pop/TileSprite";

const texture = new Texture("./images/bravedigger-tiles.png");

export default class Ghost extends TileSprite {
  constructor() {
    super(texture, TILE_SIZE, TILE_SIZE);
    this.frame = {
      x: 5,
      y: 1,
    };
  }

  update(dt: number): void {
      
  }
}
