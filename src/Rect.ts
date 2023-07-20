import Entity from "./Entity";
import { renderRect } from "./Renderers";

export default class Rect extends Entity {
    constructor() {
        super();
    }

    render(ctx: CanvasRenderingContext2D) {
        renderRect(this, ctx);
    }
}