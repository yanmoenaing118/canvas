import Texture from "./Texture";
import TileMap from "./TileMap";
import TileSprite from "./TileSprite";
import Vec2 from "./Vec2";
import { CELLSIZE } from "./constants";
import { Frame } from "./types";
import { rand, randInOne } from "./utils";

const frames: Frame[] = [
  { id: "top-left-corner", x: 8, y: 0, meta: { walkable: false } },
  { id: "top-right-corner", x: 8, y: 0, meta: { walkable: false } },
  { id: "left-border", x: 8, y: 1, meta: { walkable: false } },
  { id: "right-border", x: 2, y: 1, meta: { walkable: false } },
  { id: "bottom-border", x: 7, y: 8, meta: { walkable: false } },
  { id: 'top-border', x: 8, y: 0, meta: { walkable: false }},
  { id: "empty", x: 1, y: 1 },
];

const getById = (id: string) => frames.find((f) => f.id === id);

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


            const tile = new TileSprite(texture.img, CELLSIZE, CELLSIZE);
            this.chldren.push(tile);
            
            
            tile.pos = new Vec2(x * CELLSIZE, y * CELLSIZE);

            tile.frame = getById('empty') as Frame;

            if(x == 0 || y == 0 || x == this.mapW - 1 || y == this.mapH - 1) {
                tile.frame = getById("bottom-border") as Frame;
                continue;
            }

            if( x % 2 ) continue;

            if(y % 2 ||  randInOne(5)) {
                tile.frame = getById('bottom-border') as Frame;
            }

          }
        }

    }

}