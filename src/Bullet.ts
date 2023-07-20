import Rect from "./Rect";
import { renderRect } from "./Renderers";
import { HEIGHT, WIDTH } from "./constants";
import { Styles } from "./types";

export default class Bullet extends Rect {

    dead = false;
    angle: number = 0;
    speed = 120;
    style: Styles = {
        fill: 'brown'
    }

    constructor() {
        super();
        this.w = 16;
        this.h = 16;
    }

    update(dt: number, t: number): void {
        this.pos.x += Math.cos(this.angle) * this.speed * dt;
        this.pos.y += Math.sin(this.angle) * this.speed * dt;

        if(this.pos.x > WIDTH || this.pos.y > HEIGHT || this.pos.x < 0 || this.pos.y < 0) {
            this.dead = true;
        }
    }

    render(ctx: CanvasRenderingContext2D){
        renderRect(this, ctx);
    }

}