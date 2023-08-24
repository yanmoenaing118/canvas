import Sprite from "./Sprite";
import Texture from "./Texture";

export default class Girl extends Sprite {
    constructor(url: string) {
        super(new Texture(url));
        this.w = 100;
        this.h = 194;
    }    

    render(context: CanvasRenderingContext2D) {
        context.save();
        context.fillStyle = "pink";
        // context.fillRect(girl.pos.x, 0, girl.w, h);
        context.restore();
        context.save();
        context.translate(this.pos.x, this.pos.y);
        // context.scale(this.scale.x, this.scale.y);
        context.drawImage(this.texture.img, 0, 0);
        context.restore();
    }
}