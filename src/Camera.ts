import Player from "./Player";
import { clamp } from "./helpers";

export default class Camera {
  pos: { x: number; y: number } = { x: 0, y: 0 };
  w: number;
  h: number;
  worldSize: { w: number; h: number } = { w: 0, h: 0 };
  subject!: Player;
  offset: { x: number; y: number } = { x: 0, y: 0 };

  constructor(w: number, h: number, worldSize: { w: number; h: number }) {
    this.w = w;
    this.h = h;
    this.worldSize = worldSize;
  }

  setSubject(player: Player) {
    this.subject = player;
    this.offset.x = player.w / 2;
    this.offset.y = player.h / 2;
  }
  focus() {
    const maxX = this.worldSize.w - this.w;
    const centeredX = this.subject.pos.x + this.offset.x - this.w / 2;
    const x = -clamp(centeredX, 0, maxX);

    const maxY = this.worldSize.h - this.h;
    const centeredY = this.subject.pos.y - this.offset.y - this.h / 2;
    const y = -clamp(centeredY, 0, maxY);

    this.pos.x = x;
    this.pos.y = y;
  }

  update(dt: number) {
    this.focus();
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.pos.x, this.pos.y);
    ctx.restore();
  }
}
