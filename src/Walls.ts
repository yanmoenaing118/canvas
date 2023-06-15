import Camera from "./Camera";

export default class Wall {
  walls: { x: number; y: number; w: number; h: number; color: string }[] = [];
  camera: Camera;
  constructor(w: number, h: number, wallSize: number, camera: Camera) {
    this.walls = [
      { x: 0, y: 0, w: w, h: wallSize, color: "red" },
      { x: w - wallSize, y: 0, w: wallSize, h: h, color: "green" },
      { x: 0, y: h - wallSize, w: wallSize, h: wallSize, color: "blue" },
      { x: 0, y: 0, w: wallSize, h: h - wallSize, color: "yellow" },
    ];
    this.camera = camera;
  }

  update(dt: number) {
    const [top, right, bottom, left] = this.walls
    left.x = dt * 200 * this.camera.pos.x;
    right.x =   ( dt * 200 * this.camera.pos.x );
    
    top.y = dt * 200 * this.camera.pos.y;
    bottom.y =  (dt * 200 * this.camera.pos.y);
  }

  render(ctx: CanvasRenderingContext2D) {
    this.walls.forEach((wall) => {
      ctx.save();
      ctx.fillStyle = wall.color;
      ctx.translate(wall.x, wall.y);
      ctx.fillRect(0, 0, wall.w, wall.h);
      ctx.restore();
    });
  }
}
