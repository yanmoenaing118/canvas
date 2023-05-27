import Sprite from "./Sprite";
import Texture from "./Texture";
import TileSprite from "./TileSprite";
import math from "./math";
import { FRAME_SPIDERS } from "./sprite-frames";
export default class Spider extends TileSprite {
    speed: number;
    constructor() {
        super(new Texture('./assets/spider.png'))
        this.speed = math.rand(20,150);
    }

    update(dt: number, t: number) {
        this.pos.x -= this.speed * dt;
        this.frame.x = Math.floor(t / 0.15) % FRAME_SPIDERS;
    }
}