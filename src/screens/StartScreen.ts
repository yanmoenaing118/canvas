import Container from "../pop/Container";
import Text from "../pop/Text";
import KeyControls from "../pop/controls/KeyControls";
import MouseControls from "../pop/controls/MouseControls";

export default class StartScreen extends Container {
  readonly text: Text;
  readonly controls: MouseControls;
  onStart: () => void;

  /**
   *
   * @param title Start screen title
   * @param w width of the game canvas
   * @param h height of the game canvas
   * @param onStart callback function to start the Game
   */
  constructor(title: string, w: number, h: number,controls: MouseControls, onStart: () => void) {
    super();
    this.controls = controls;
    this.text = this.add(new Text(title));
    this.text.style = {
      fill: "green",
      font: '28px monospace'
    };

    this.onStart = onStart;
  }

  update(dt: number, t: number): void {
      super.update(dt,t);
      if(this.controls.pressed) {
        console.log(this.controls.pos);
        this.onStart();
      }
      this.controls.update();
  }
}
