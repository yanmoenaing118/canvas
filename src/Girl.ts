import Sprite from "./Sprite";
import Texture from "./Texture";

export default class Girl extends Sprite {
    constructor(url: string) {
        super(new Texture(url));
        this.w = 64;
        this.h = 128;
    }    
}