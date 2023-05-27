import Sprite from "./Sprite";
import Texture from "./Texture";

export default class Girl extends Sprite {
    constructor() {
        super(new Texture('./assets/girl.png'));
    }    
}