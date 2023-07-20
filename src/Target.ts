import Rect from "./Rect";
import { HEIGHT, WIDTH } from "./constants";

export default class Target extends Rect {
    constructor() {
        super();
        this.pos.x = Math.random() * WIDTH - this.w;
        this.pos.y = Math.random() * HEIGHT - this.h;
        this.style.fill = 'red';
    }
}