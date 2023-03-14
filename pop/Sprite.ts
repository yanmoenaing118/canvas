import Texture from "./Texture";

export default class Sprite {
  texture: Texture;
  pos: { x: number; y: number };
  constructor(texture: Texture) {
    this.texture = texture;
    this.pos = {
      x: 0,
      y: 0,
    };
  }
}
