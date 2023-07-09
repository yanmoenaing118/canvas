import Entity from "./Entity";

class Text extends Entity {
  text: string;
  style: {
    fill: string;
  };
  constructor(text: string, style: { fill: string }) {
    super();
    this.text = text;
    this.style = style;
  }



  update(dt: number, t: number): void {
      
  }
}


export default Text;