import Texture from "./Texture";
import { Position } from "./models";

class Sprite {
  texture: Texture | undefined;
  pos: Position = { x: 0, y: 0 };
  dead: boolean = false;
  scale = {x: 1, y: 1}
  anchor: Position = { x: 0, y: 0};
  pivot: Position = {x: 0, y: 0};
  rotation: number = 0;
  w!: number;
  h!: number;
  constructor(texture: Texture) {
    this.texture = texture;
    this.pos = { x: 0, y: 0 };
  }

  update(dt: number, t: number) {}
}

export default Sprite;
