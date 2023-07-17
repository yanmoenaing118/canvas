import Entity from "./Entity";
import { CELL_HEIGH, CELL_WIDTH, WIDTH } from "./constants";

export default class Target extends Entity {
    constructor() {
        super(CELL_WIDTH,  CELL_HEIGH, 'rgba(22,123,120,0.3)');
        this.pos.x = WIDTH / 2;
        this.pos.y = WIDTH / 2;
        this.hitBox = {
            x: 5,
            y: 5,
            w: this.w - 5 * 2,
            h: this.h - 5 * 2
        }
        this.debugMode = true
    }

}