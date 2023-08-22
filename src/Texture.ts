export default class Texture {
    img: HTMLImageElement;
    constructor(url: string) {
        this.img = new Image();
        this.img.src = url;
    }
}

export const textures = {
    bg: new Texture("./assets/pyramid.jpg"),
    
}