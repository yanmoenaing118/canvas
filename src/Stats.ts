import Entity from "./Entity";
import { HEIGHT, WIDTH } from "./constants";
import Text from "./Text";


// just a class to display information about the Camera and the Entity being followed by the Camera
export default class Stats extends Text {

    constructor(text: string) {
        super(text, '16px monospace');
        this.pos.x = WIDTH / 2;
        this.pos.y = HEIGHT / 2;
        this.style.fillStyle = 'white';
    }

}
