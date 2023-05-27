import Texture from "./Texture";
import TileSprite from "./TileSprite";

const FRAMES_SOLDIERS = 12;

export default class Soldier extends TileSprite {
    speed: number = 200;
    constructor() {
        super(new Texture('./assets/soldier.png'))
        this.frame.y = 1;
        this.frame.x = 1;
    }

    update(dt: number, t: number) {
        const frameIndex = Math.floor(t / 0.15) % FRAMES_SOLDIERS ? Math.floor(t / 0.1) % FRAMES_SOLDIERS : 1;
        this.frame.x = frameIndex;
    }
}