import Sprite from "./Sprite";
import Texture from "./Texture";

export default class Girl extends Sprite {
    constructor(url: string) {
        super(new Texture(url));
        this.scale =  {
            x: .25,
            y: .25
        }
        this.w = 1078 * this.scale.x;
        this.h = 2089 * this.scale.y;
    }    
}