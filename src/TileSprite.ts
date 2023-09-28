import Sprite from "./Sprite";
import Texture from "./Texture";
import { Vec2 } from "./classes";

class TileSprite extends Sprite {
    constructor(
      public texture: Texture,
      public w: number,
      public h: number,
      public tileW: number,
      public tileH: number,
      x: number,
      y: number,
      public frame: Vec2
    ) {
      super(texture, w, h, x, y);
    }
  
    render(ctx: CanvasRenderingContext2D) {
      const { pos, tileW, tileH, texture, frame } = this;
      ctx.save();
      ctx.translate(pos.x, pos.y);
      ctx.drawImage(
        texture.texture,
        frame.x * tileW,
        frame.y * tileH,
        tileW,
        tileH,
        0,
        0,
        tileW,
        tileH
      );
      ctx.restore();
    }
  }
  