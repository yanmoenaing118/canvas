import Vec from "./Vec";
import { h, w } from "./canvas";

export default class Circle {
    pos: Vec;
    radius = 0;
    _fill = "black";
     vel: Vec;
    constructor() {
        this.pos = new Vec(Math.random() * w , Math.random() * h);
        this.vel = new Vec(Math.random() * 1.5,Math.random() * Math.random() + 1.2);
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
        if(this.pos.x > w - this.radius || this.pos.x < this.radius) {
            this.vel.set(this.vel.x * -1, this.vel.y);
        } 
        if(this.pos.y > h - this.radius || this.pos.y < this.radius) {
            this.vel.set(this.vel.y, this.vel.y * -1);
        }
    }
}