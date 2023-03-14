export default class Texture {
  image: HTMLImageElement;

  constructor(url: string) {
    this.image = new Image();
    this.image.src = url;
  }
}
