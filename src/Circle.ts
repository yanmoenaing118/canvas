import Vec from "./Vec";
import { h, w } from "./canvas";

export default class Circle {
    pos: Vec;
    radius = 4;
    _fill = "black";
     vel: Vec;
    constructor() {
        this.pos = new Vec(w / 2, h/2);
        this.vel = new Vec(Math.random() * 1.5,Math.random() * 3);
    }

    set fill(value: string) {
        this._fill = value;
    }

    get fill() {
        return this._fill;
    }

    render(ctx: CanvasRenderingContext2D) {
        const { pos, radius, fill } = this;
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = fill;
        ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 360, false);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    update(dt: number) {
        this.pos.add(this.vel);
        if(this.pos.x > w - this.radius || this.pos.x < 0) {
            this.vel.set(this.vel.x * -1, this.vel.y)
        } 
        if(this.pos.y > h - this.radius || this.pos.y < 0) {
            this.vel.set(this.vel.y, this.vel.y * -1)
        }
    }
}