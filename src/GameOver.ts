import Score from "./Score";
import Text from "./Text";
import { h, w } from "./constants";

export default class GameOver {
  over: Text;
  constructor(public score: Score) {
    this.over = new Text("Game Over!");
  }
  render(context: CanvasRenderingContext2D) {
    context.globalAlpha = 0.65;
    context.save();
    context.translate(0, 0);
    context.fillStyle = "black";
    context.fillRect(0, 0, w, h);
    context.restore();

    context.save();
    context.fillStyle = "black";
    context.font = "68px monospace";
    context.strokeStyle = "white";
    context.lineWidth = 3;
    context.translate(w / 2 - this.over.width(context) / 2.25, h / 2 - 34);
    context.fillText(this.over.text, 0, 0);
    context.strokeText(this.over.text, 0, 0);
    context.restore();

    context.save();
    context.fillStyle = "white";
    context.font = "24px monospace";
    context.strokeStyle = "white";
    context.translate(w / 2 - this.over.width(context) / 2.25, h / 2 + 34);
    context.fillText(this.score.text, 0, 0);
    context.restore();

    context.save();
  }
}
