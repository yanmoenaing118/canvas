import Container from "./Container";
import Texture from "./Texture";
import TileSprite from "./TileSprite";

export default class TileMap extends Container {
  mapW: number;
  mapH: number;
  mapCols: number;
  mapRows: number;
  tileCellW: number;
  tileCellH: number;
  tileW: number;
  tileH: number;
  tileCols: number;
  tileRows: number;
  tileMapSourceTexture: Texture;

  constructor(
    texture: Texture,
    mapW: number,
    mapH: number,
    tileCellW: number,
    tileCellH: number,
    tileW: number,
    tileH: number
  ) {
    super();
    this.mapW = mapW;
    this.mapH = mapH;
    this.tileCellW = tileCellW;
    this.tileCellH = tileCellH;
    this.mapCols = Math.floor(mapW / tileCellW);
    this.mapRows = Math.floor(mapH / tileCellH);
    this.tileW = tileW;
    this.tileH = tileH;
    this.tileCols = Math.floor(tileW / tileCellW);
    this.tileRows = Math.floor(tileH / tileCellH);
    this.tileMapSourceTexture = texture;
    this.createTiles();
  }

  private createTiles() {
    const cols = this.tileCols;
    const rows = this.tileRows;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const frame = { x: j, y: i };
        const pos = { x: j * 32, y: 32 * i };
        const tileSpirte = new TileSprite(
          this.tileMapSourceTexture,
          this.tileCellW,
          this.tileCellH
        );
        tileSpirte.pos = pos;
        tileSpirte.frame = frame;
        this.children.push(tileSpirte);
      }
    }
  }
}
