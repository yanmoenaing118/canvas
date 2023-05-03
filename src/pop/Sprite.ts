import Texture from "./Texture";
import { Position } from "./models";

class Sprite {
  texture: Texture | undefined;
  pos: Position = { x: 0, y: 0 };
  update!: (dt: number) => void;
  constructor(texture: Texture) {
    this.texture = texture;
    this.pos = { x: 0, y: 0 };
  }
}

export default Sprite;
