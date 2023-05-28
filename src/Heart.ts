import Sprite from "./Sprite";
import Texture from "./Texture";

export default class Heart extends Sprite {
    constructor() {
        super(new Texture('./assets/heart.png'))
        this.w = 16;
        this.h = 16;
        this.dead = false
    }
}