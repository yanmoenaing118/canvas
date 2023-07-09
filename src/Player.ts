import KeyControls from "./KeyControls";
import Rect from "./Rect";
import TileMap from "./TileMap";

class Player extends Rect {
    controls: KeyControls;
    map: TileMap;
    constructor(controls: KeyControls, map: TileMap) {
        super();
        this.controls = controls;
        this.map = map;
    }

    update(dt: number, t: number): void {
        this.pos.x += dt * 320 *  this.controls.x;
        this.pos.y += dt * 320 * this.controls.y;
    }
}


export default Player;