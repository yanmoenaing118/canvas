import KeyControls from "./KeyControls";
import { renderGrid } from "./DebugGrid";
import { CELLSIZE, HEIGHT, MAX_FRAME, SPEED, WIDTH } from "./constants";
import Entity from "./Entity";
import { clamp } from "./utils";

const canvas = document.createElement("canvas") as HTMLCanvasElement;
document.body.appendChild(canvas);

const w = WIDTH;
const h = HEIGHT;
let cellSize = CELLSIZE;

canvas.width = w;
canvas.height = h;
const controls = new KeyControls();
export const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
let dt = 1 / 60;
let time = 0;

class TileMap extends Entity {
  cols: number = 0;
  rows: number = 0;
  tileSize: number = CELLSIZE;
  wallCoordinates = [
    [2,0],
    [2,1],
    [2,3],
    [4,1]
  ]

  constructor(img: HTMLImageElement, w: number, h: number, tileSize: number) {
    super();

    this.tileSize = tileSize;
    this.cols = w / tileSize;
    this.rows = h / tileSize;

    this.init();
  }

  init() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const index = row * this.cols + col;
      }
    }
  }

  /**
   *
   * @param y y position of the player
   * @returns the row where the player is
   */
  getRow(y: number) {
    return Math.round(y / this.tileSize);
  }

  /**
   *
   * @param x position of the player
   * @returns the col where the player is
   */
  getCol(x: number) {
    return Math.round(x / this.tileSize);
  }


  render(ctx: CanvasRenderingContext2D) {
    for(let row = 0; row < this.rows ; row++) {
      for(let col = 0; col < this.cols; col++) {

        const rect = new Rect();
        if(this.checkWall(row,col)) {
          rect.pos.x = col * this.w;
          rect.pos.y = row * this.h;
          rect.render(ctx);
        }
        

      }
    }
  }

  checkWall(row: number,col: number) {
    return this.wallCoordinates.some(([x,y]) => {
      if(x == col && y == row) return true;
    } )
  }
}

class Rect extends Entity {
  fill = "purple";
  constructor() {
    super();
    this.w = CELLSIZE;
    this.h = CELLSIZE;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.fillStyle = this.fill;
    ctx.translate(this.pos.x, this.pos.y);
    ctx.fillRect(0, 0, this.w, this.h);
    ctx.restore();
  }
}

class Player extends Rect {
  fill = "rgba(0,0,0,.3)";
  controls: KeyControls;
  map: TileMap;
  constructor(controls: KeyControls, map: TileMap) {
    super();
    this.w = CELLSIZE;
    this.h = CELLSIZE;
    this.controls = controls;
    this.map = map;
  }

  update(dt: number) {
    this.pos.x += dt * SPEED * controls.x;
    this.pos.y += dt * SPEED * controls.y;

    const row = this.map.getRow(this.pos.y);
    const col = this.map.getCol(this.pos.x);




    console.log(`Player is at (x,y) => (${col},${row})`);

    this.pos.x = clamp(this.pos.x, 0, WIDTH);
    this.pos.y = clamp(this.pos.y, 0, HEIGHT);
  }
}

const texture = new Image();
texture.src = "forest.png";

const map = new TileMap(texture, w, h, CELLSIZE);
const player = new Player(controls, map);

function loop(ellapsedTime: number) {
  requestAnimationFrame(loop);
  ctx.clearRect(0, 0, w, h);

  dt = Math.min((ellapsedTime - time) * 0.001, MAX_FRAME);
  time = ellapsedTime;

  
  player.update(dt);

  map.render(ctx);
  player.render(ctx);
  renderGrid(ctx, h / cellSize, w / cellSize, cellSize, cellSize, "black");
}

requestAnimationFrame(loop);
