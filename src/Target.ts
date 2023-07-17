import Entity from "./Entity";
import { CELL_HEIGH, CELL_WIDTH, WIDTH } from "./constants";

export default class Target extends Entity {
    constructor() {
        super(CELL_WIDTH,  CELL_HEIGH, 'pink');
        this.pos.x = WIDTH / 2;
        this.pos.y = WIDTH / 2;
    }

}