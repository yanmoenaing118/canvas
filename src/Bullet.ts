import Rect from "./Rect";
import { renderRect } from "./Renderers";
import { Styles } from "./types";

export default class Bullet extends Rect {

    dead = false;
    angle: number = 0;
    speed = 320;
    style: Styles = {
        fill: 'red'
    }

    constructor(angleToPlayer: number = 0) {
        super();
        this.w = 32;
        this.h = 32;
        this.angle = angleToPlayer;
    }

    update(dt: number, t: number): void {
        this.pos.x += Math.cos(this.angle) * this.speed * dt;
        this.pos.y += Math.sin(this.angle) * this.speed * dt;

        console.log(JSON.stringify(this.pos))
    }

    render(ctx: CanvasRenderingContext2D){
        renderRect(this, ctx);
    }

}