import Texture from "./Texture";
import { h, w } from "./constants";

export default class Background {
    bg: Texture;
    constructor() {
        this.bg = new Texture("./assets/bg1.png");
    }

    render(context: CanvasRenderingContext2D){
        context.save();
        context.drawImage(this.bg.img, 0, 0, w, h);
        context.restore();
    }
}