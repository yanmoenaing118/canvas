import Entity from "./Entity";

export default class Title extends Entity {
    constructor() {
        super();
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.save();


        ctx.restore();
    }
}
