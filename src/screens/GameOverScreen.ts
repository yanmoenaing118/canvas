import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants";
import Container from "../pop/Container";
import MouseControls from "../pop/controls/MouseControls";
import Text from "../pop/Text";
import Texture from "../pop/Texture";
import TileSprite from "../pop/TileSprite";


const texture = new TileSprite(new Texture('images/bg.png'), CANVAS_WIDTH * 2, CANVAS_HEIGHT * 2);

export default class GameOverScreent extends Container {
  readonly controls: MouseControls;
  onReStart: () => void;

  /**
   *
   * @param controls MouseControls
   * @param onReStart callback function to restart the game
   */
  constructor(controls: MouseControls, onReStart: () => void) {
    super();
    this.onReStart = onReStart;
    this.controls = controls;
    this.add(texture);
    const text = this.add(new Text("Click anywereto restart the game!"));
    text.style = {
        fill: 'lightgreen',
        font: '28px monospace'
    }
    text.pos.y = CANVAS_HEIGHT / 2;
    text.pos.x = 50;
  }

  update(dt: number, t: number): void {
    super.update(dt, t);
    if (this.controls.pressed) {
      console.log(this.controls.pos);
      this.onReStart();
    }
    this.controls.update();
  }
}
