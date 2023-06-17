import Container from "./Container";
import Entity from "./Entity";

export default class Renderer {

    canvasWidth: number;
    canvasHeight: number;

    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    constructor(w: number, h: number) {
        this.canvasWidth = w;
        this.canvasHeight = h;

        this.canvas = document.createElement('canvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.canvas.width = w;
        this.canvas.height = h;

        document.body.appendChild(this.canvas);
    }
    

    /**
     * renders a collection of entities 'The Container Class'
     */
    render(container: Container) {
        function renderChildren() {

        }
    }
}