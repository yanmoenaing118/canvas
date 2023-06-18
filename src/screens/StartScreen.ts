import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants";
import Container from "../pop/Container";
import Text from "../pop/Text";
import Texture from "../pop/Texture";
import TileSprite from "../pop/TileSprite";
import MouseControls from "../pop/controls/MouseControls";

const background = new TileSprite(new Texture('images/bg.png'), CANVAS_WIDTH, CANVAS_HEIGHT);
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
    this.add(background);
    this.text = this.add(new Text(title));
    this.text.style = {
      fill: "white",
      font: '28px monospace'
    };
    this.text.pos.y = CANVAS_HEIGHT /2 - 10;
    this.text.pos.x = 115;

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
