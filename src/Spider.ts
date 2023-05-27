import Sprite from "./Sprite";
import Texture from "./Texture";

export default class Spider extends Sprite {
    constructor() {
        super(new Texture('./assets/spider.png'))
    }
}