import Text from "./Text";
import { w } from "./constants";

export default class Score extends Text {
  constructor(score: string) {
    super(score);
    this.style.color = 'white';
    this.style.font = "14px monospace";
  }

  render(context: CanvasRenderingContext2D) {
    context.save();
    context.translate(w - this.width(context) * 2.5 - 1, 0);
    context.fillStyle = "rgba(0,225,0,0.1)";
    context.strokeStyle = "white";
    context.fillRect(0, 0, this.width(context) * 4, 30);
    context.strokeRect(0,0,this.width(context) * 4, 30 )
    context.restore();

    context.save();
    context.font = this.style.font as string;
    context.fillStyle = this.style.color as string;
    context.translate(w - this.width(context) - 4, 20);
    context.fillText(this.text, 0, 0);

    context.restore();
  }
}
