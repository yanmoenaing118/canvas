import { Vec2 } from "./classes";

export default class Text {
    pos: Vec2;
    constructor(public text: string,  x: number,  y: number,public color: string, public font: string = '22px arial') {
        this.pos = new Vec2(x, y);
    }


    render(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.fillStyle = this.color || 'black';
        ctx.font = this.font;
        ctx.translate(this.pos.x, this.pos.y);
        ctx.textBaseline = "top";
        ctx.fillText(this.text, 0, 0);
        ctx.restore();
    }
}