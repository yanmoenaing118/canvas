export default class Player {
    pos = {x: 0, y: 0};
    img: HTMLImageElement;
    constructor(){
        this.img = new Image();
        this.img.src = "logo.ico";
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);
        ctx.drawImage(this.img, 0,0);
        ctx.restore();  
    }
}