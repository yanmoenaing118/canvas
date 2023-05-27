import Sprite from "./Sprite";
import Texture from "./Texture";
import TileSprite from "./TileSprite";
import math from "./math";
import { FRAME_SPIDERS } from "./sprite-frames";
export default class Spider extends TileSprite {
    padding: number = 4;
    speed: number;
    constructor() {
        super(new Texture('./assets/spider.png'))
        this.w = 64 - this.padding;
        this.h = 64 - this.padding;
        this.speed = math.rand(200,400);
    }

    update(dt: number, t: number) {
        this.speed += t * 0.5 ; 
        this.pos.x -= this.speed * dt;
        const frameRate = (10 / this.speed) * 2.5;
        this.frame.x = Math.floor(t / frameRate) % FRAME_SPIDERS;
    }
}