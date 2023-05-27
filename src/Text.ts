import { TextStyle } from "./types";

export default class Text {
  text: string;
  style: TextStyle;
  constructor(text: string) {
    this.text = text;
    this.style = {
        font: '16px serif',
        color: 'black'
    }
  }

  width(context: CanvasRenderingContext2D): number {
    return context.measureText(this.text).width;
  }
}
