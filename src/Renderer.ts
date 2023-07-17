import { HEIGHT, WIDTH } from "./constants";

export default class Canvas {

    viewport: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    constructor() {
        const canvas = document.createElement('canvas');
        canvas.style.border = '1px solid black';
        canvas.width = WIDTH;
        canvas.height = HEIGHT;

        this.viewport = canvas;
        this.ctx = this.viewport.getContext('2d') as CanvasRenderingContext2D;

        document.body.appendChild(canvas);
    }

}

