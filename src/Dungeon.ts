import Texture from "./Texture";
import TileMap from "./TileMap";
import TileSprite from "./TileSprite";
import Vec2 from "./Vec2";
import { CELLSIZE } from "./constants";

const texture = new Texture('dungeon.png');
export default class Dungeon extends TileMap {
    constructor(w: number, h: number) {
        const mapW = Math.ceil(w / CELLSIZE);
        const mapH = Math.ceil(h/ CELLSIZE);
        super(texture.img, mapW, mapH,CELLSIZE,CELLSIZE);
        this.createMap();
        console.log(mapW, mapH)
    }

    createMap() {
        for (let y = 0; y < this.mapH; y++) {
          for (let x = 0; x < this.mapW; x++) {
            const index = y * this.mapW + x;
            const tile = new TileSprite(texture.img, CELLSIZE, CELLSIZE);
            tile.pos = new Vec2(x * CELLSIZE, y * CELLSIZE);
            this.chldren.push(tile);
          }
        }

    }

}