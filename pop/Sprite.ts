import Texture from "./Texture";

export default class Sprite {
  texture: Texture;
  pos: { x: number; y: number };
  update: (delta: number, t: number, self: any) => void = (delta, t, self): void => {};
  dead: boolean;
  constructor(texture: Texture) {
    this.texture = texture;
    this.pos = {
      x: 0,
      y: 0,
    };
    this.dead = false;
  }
  
}
