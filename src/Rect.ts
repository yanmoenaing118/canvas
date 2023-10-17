import { Vec2 } from "./classes";

export default class Rect {
    pos: Vec2;
    walkable = true;
    constructor(x: number, y: number, public w: number, public h: number, public color: string) {
        this.pos = new Vec2(x, y);
    }

    render(ctx: CanvasRenderingContext2D) {
        const { pos, w, h, color } = this;
        ctx.save();
        ctx.translate(pos.x, pos.y);
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, w, h);
        ctx.restore();
    }
}