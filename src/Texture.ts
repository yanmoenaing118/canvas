import Entity from "./Entity";

export default class Texture extends Entity {
    img: HTMLImageElement;
    constructor(src: string) {
        super(0,0,0,0);
        this.img = new Image();
        this.img.src = src;
    }
    
}