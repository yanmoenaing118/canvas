import Entity from "./Entity";
import KeyControls from "./KeyControls";

export default class Player extends Entity {
    constructor(x: number, y: number, w: number, h: number) {
        super(x,y,w,h);
    }
}