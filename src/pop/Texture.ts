class Texture {
  img: HTMLImageElement;
  constructor(url: string) {
    this.img = new Image();
    this.img.src = url;
  }
}

export default Texture;
