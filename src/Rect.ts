import { Vec2 } from "./classes";

export default class Rect {
    pos: Vec2;
    walkable = true;
    scale: Vec2;
    constructor(x: number, y: number, public w: number, public h: number, public color: string) {
        this.pos = new Vec2(x, y);
        this.scale = new Vec2(1,1);
    }

    render(ctx: CanvasRenderingContext2D) {

        const { pos, w, h, color, scale } = this;
        if(!pos || !w || !h || !color) return;
        ctx.save();
        ctx.translate(pos.x, pos.y);
        ctx.scale(scale.x, scale.y);
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, w, h);
        ctx.restore();
    }
}