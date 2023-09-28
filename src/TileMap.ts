import Texture from "./Texture";
import TileSprite from "./TileSprite";
import { TileSpriteFrame } from "./classes";

export default class TileMap {
  children: TileSprite[] = [];

  constructor(
    private level: TileSpriteFrame[],
    public texture: Texture,
    public mapW: number,
    public mapH: number,
    public tileW: number,
    public tileH: number
  ) {
    this.level.forEach((frame, i) => {
      const x = tileW * (i % mapW);
      const y = Math.floor(i / mapW) * tileH;
      const tileSprite = new TileSprite(
        texture,
        tileW,
        tileH,
        tileW,
        tileH,
        x,
        y,
        {
          x: frame.x,
          y: frame.y,
        }
      );
      this.children.push(tileSprite);
    });
  }

  render(ctx: CanvasRenderingContext2D) {
    this.children.forEach((child) => child.render(ctx));
  }
}
