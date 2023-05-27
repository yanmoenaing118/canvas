import Sprite from "./Sprite";
import Texture from "./Texture";

export default class Bullet extends Sprite {
    speed: number = 850;
    constructor() {
        super(new Texture('./assets/bullet.png'))
        this.w = 16;
        this.h = 16;
    }

    update(dt: number, t: number) {
        this.pos.x += dt * this.speed;
    }

}