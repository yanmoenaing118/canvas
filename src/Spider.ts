import KeyControls from "./KeyControls";
import TileSprite from "./TileSprite";
import Vec2 from "./Vec2";
import { CELLSIZE, WIDTH, HEIGHT, WORLD_W, WORLD_H, SPEED } from "./constants";
import { clamp } from "./utils";

const spiderImg = new Image();
spiderImg.src = "spider10.png";

const walkLeft = new Array(1).fill(0).map((_, i) => ({
  x: i,
  y: 3,
}));
const wallkRight = new Array(1).fill(0).map((_, i) => ({
  x: i,
  y: 1,
}));
const walkDown = new Array(1).fill(0).map((_, i) => ({
  x: i,
  y: 2,
}));
const walkUp = new Array(1).fill(0).map((_, i) => ({
  x: i,
  y: 0,
}));

export default class Spider extends TileSprite {
  controls: KeyControls;
  speed: number = 0.09;
  animSpeed: number = this.speed;
  nextCell: number = this.speed;

  dir: Vec2 = { 
    x: 0,
    y: 0
  }
  constructor(controls: KeyControls) {
    super(spiderImg, CELLSIZE, CELLSIZE);
    this.controls = controls;
    this.anim.add("walkLeft", walkLeft, this.animSpeed);
    this.anim.add("walkRight", wallkRight, this.animSpeed);
    this.anim.add("walkDown", walkDown, this.animSpeed);
    this.anim.add("walkUp", walkUp, this.animSpeed);
  }

  update(dt: number, t: number): void {
    super.update(dt, t);



    if ((this.nextCell -= dt) < 0) {
      this.nextCell += this.speed;


      if( this.controls.x && this.controls.x !== this.dir.x ) {
        this.dir.x = this.controls.x;
        this.dir.y = 0;
        this.pos.x = Math.round(this.pos.x / CELLSIZE) * CELLSIZE;
      } else if(this.controls.y && this.controls.y !== this.dir.y) {
        this.dir.y = this.controls.y;
        this.dir.x = 0;
        this.pos.y = Math.round(this.pos.y / CELLSIZE) * CELLSIZE;
      } else {
        this.dir.x = 0;
        this.dir.y = 0;
      }

    }


    if (this.dir.x  == 1) {
      this.anim.play("walkLeft");
    } else if (this.dir.x  == -1) {
      this.anim.play("walkRight");
    } else if (this.dir.y == 1) {
      this.anim.play("walkDown");
    } else if (this.dir.y == -1) {
      this.anim.play("walkUp");
    } else {
      // this.anim.pause();
    }

    this.pos.x += dt * this.dir.x * (64 / this.speed);
    this.pos.y += dt * this.dir.y * (64 / this.speed);



    this.pos.x = clamp(this.pos.x, 0, WORLD_W - this.tileW);
    this.pos.y = clamp(this.pos.y, 0, WORLD_H - this.tileH);
  }
}
