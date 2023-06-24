import Texture from "./Texture";
import TileMap from "./TileMap";
import TileSprite from "./TileSprite";
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
        for(let i = 0;  i < this.mapW * this.mapH ; i++) {
            const tile = new TileSprite(texture.img, this.tileW,this.tileH);
            const frameX =0;
            const frameY = 3;
            const posX = (i % this.mapW) * tile.tileW;
            const posY = Math.floor( i / this.mapW) * tile.tileH;
            tile.pos = {
                x: posX,
                y: posY
            }
            tile.frame = { x: frameX, y: frameY};
            this.chldren.push(tile);
        }

    }

}