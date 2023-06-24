import KeyControls from "./KeyControls";
import TileSprite from "./TileSprite";
import { CELLSIZE, WIDTH, HEIGHT, WORLD_W, WORLD_H, SPEED } from "./constants";
import { clamp } from "./utils";

const spiderImg = new Image();
spiderImg.src = "spider10.png";

const walkLeft = new Array(10).fill(0).map((_, i) => ({
  x: i,
  y: 3,
}));
const wallkRight = new Array(10).fill(0).map((_,i) => ({
  x: i,
  y: 1
}))
const walkDown = new Array(10).fill(0).map((_, i) => ({
  x: i,
  y: 2
}))
const walkUp = new Array(10).fill(0).map((_,i)=>({
  x: i,
  y: 0
}))

export default class Spider extends TileSprite {
  controls: KeyControls;
  speed: number = SPEED;
  animSpeed: number = 0.05;
  constructor(controls: KeyControls) {
    super(spiderImg, CELLSIZE, CELLSIZE);
    this.controls = controls;
    this.anim.add('walkLeft', walkLeft, this.animSpeed);
    this.anim.add('walkRight', wallkRight, this.animSpeed);
    this.anim.add('walkDown', walkDown, this.animSpeed);
    this.anim.add('walkUp', walkUp, this.animSpeed);
    
  }

  update(dt: number, t: number): void {
    super.update(dt, t);
    this.pos.x += dt * this.controls.x * this.speed;
    this.pos.y += dt * this.controls.y * this.speed;

    this.pos.x = clamp(this.pos.x, 0, WORLD_W - this.tileW);
    this.pos.y = clamp(this.pos.y, 0, WORLD_H - this.tileH);


    if(this.controls.x == 1) {
      this.anim.play('walkLeft');
    } else if(this.controls.x == -1) {
      this.anim.play('walkRight');
    } else if(this.controls.y == 1) {
      this.anim.play('walkDown');
    } else if(this.controls.y == -1) {
      this.anim.play('walkUp');
    } else {
      this.anim.pause();
    }
  }
}
