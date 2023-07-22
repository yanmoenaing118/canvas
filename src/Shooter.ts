import Rect from "./Rect";
import Target from "./Target";
import { HEIGHT, WIDTH } from "./constants";

export default class Shooter extends Rect {

  fireRate = .05;
  currentFireRate = 0;
  onFire: (...arg: any) => void;
  target: Target;

  constructor(onFire: (...arg: any) => void, target: Target) {
    super();
    this.pos.x = WIDTH / 2;
    this.pos.y = HEIGHT / 2;
    this.style.fill = "black";
    this.onFire = onFire;
    this.target = target;
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
