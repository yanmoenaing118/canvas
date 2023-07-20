import Rect from "./Rect";
import { HEIGHT, WIDTH } from "./constants";

export default class Shooter extends Rect {

  fireRate = .3;
  currentFireRate = 0;
  onFire: (...arg: any) => void;

  constructor(onFire: (...arg: any) => void) {
    super();
    this.pos.x = WIDTH / 2;
    this.pos.y = HEIGHT / 2;
    this.style.fill = "black";
    this.onFire = onFire;
  }


  fire() {
    this.onFire();
  }

  update(dt: number, t: number): void {
      if((this.currentFireRate += dt) > this.fireRate) {
        this.fire();
        this.currentFireRate = 0;
      }
  }

  
}
