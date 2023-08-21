import Entity from "./Entity";
import Vec2 from "./Vec2";
import { Styles } from "./types";

export default class Circle extends Entity {
    speed = 200;
    constructor(public pos: Vec2, public r: number, public styles: Partial<Styles> ) {
        super();
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.save();
        if(this.styles.fill) {
            ctx.fillStyle = this.styles.fill;
        }
        ctx.translate(this.pos.x, this.pos.y);
        ctx.beginPath();
        ctx.arc(0, 0, this.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
}