export default class Texture {

    texture: HTMLImageElement;
    constructor(url: string) {
        this.texture = new Image();
        this.texture.src = url;
    }

}