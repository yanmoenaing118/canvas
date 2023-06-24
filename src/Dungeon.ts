import Texture from "./Texture";
import TileMap from "./TileMap";
import TileSprite from "./TileSprite";

const texture = new Texture('dungeon.png');
export default class Dungeon extends TileMap {
    constructor() {
        super(texture.img, 16, 10,64,64);
        this.createMap();
        console.log(this.w,this.h)
    }

    createMap() {

        for(let i = 0;  i < this.mapW * this.mapH ; i++) {
            const tile = new TileSprite(texture.img, this.tileW,this.tileH);
            const frameX = Math.round(Math.random() * this.mapW);
            const frameY = Math.round(Math.random() * this.mapH);
            const posX = (i % this.mapW) * tile.tileW;
            const posY = Math.round( i / this.mapW) * tile.tileH;
            tile.pos = {
                x: posX,
                y: posY
            }
            tile.frame = { x: frameX, y: frameY};
            this.chldren.push(tile);
        }
    }

}