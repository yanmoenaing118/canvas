export default class Texture {
    img: HTMLImageElement;
    constructor(src: string) {
        this.img = new Image();
        this.img.src = src;
    }
}