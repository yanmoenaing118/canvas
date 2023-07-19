import { ctx } from ".";
import Bat from "./Bat";
import { renderImg } from "./Renderers";
import Texture from "./Texture";

export default class Heart extends Bat {

    img = new Texture('heart32x32.png').img;

    render(): void {
        ctx.save();
        ctx.globalAlpha = 0.3;
        renderImg(this, ctx);
        ctx.restore();
    }

}