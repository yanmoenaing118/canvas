export default class Wall {
  walls: { x: number; y: number; w: number; h: number; color: string }[] = [];
  constructor(w: number, h: number, wallSize: number) {
    this.walls = [
      { x: 0, y: 0, w: w, h: wallSize, color: "red" },
      { x: w - wallSize, y: 0, w: wallSize, h: h, color: "green" },
      { x: 0, y: h - wallSize, w: wallSize, h: wallSize, color: "blue" },
      { x: 0, y: 0, w: wallSize, h: h - wallSize, color: "yellow" },
    ];
  }

  update(dt: number) {}

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
