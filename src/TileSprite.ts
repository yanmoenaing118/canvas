import Sprite from "./Sprite"
import Texture from "./Texture";

export default class TileSprite extends Sprite {
    tileW: number;
    tileH: number;
    frame: {x: number,y: number} = {x: 0, y: 0}
    constructor(texture: Texture) {
        super(texture);
        this.tileH = 128;
        this.tileW = 128;
        this.anchor = {
            x: this.tileH / 2 * -1,
            y: this.tileW / 2 * -1
        }
    }
}