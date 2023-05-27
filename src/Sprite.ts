import Texture from "./Texture";
import { Position } from "./types";

export default class Sprite {
  texture: Texture;
  pos: Position = {
    x: 0,
    y: 0,
  };
  scale: Position = {
    x: 1,
    y: 1,
  };
  anchor: Position = {
    x: 0,
    y: 0,
  };
  w: number;
  h: number;
  dead: boolean = false;
  constructor(texture: Texture) {
    this.w = this.scale.x * texture.img.width;
    this.h = this.scale.y * texture.img.height;
    this.texture = texture;
  }
}
