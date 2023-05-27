import Sprite from "./Sprite";
import Texture from "./Texture";

export default class Girl extends Sprite {
    constructor() {
        super(new Texture('./assets/girl-normal.png'));
        this.scale =  {
            x: .21,
            y: .21
        }
        this.w = 1078 * this.scale.x;
        this.h = 2089 * this.scale.y;
    }    
}