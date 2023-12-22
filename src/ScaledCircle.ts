import randomColor from "randomcolor";
import Circle from "./Circle";
import Vec from "./Vec";
import { canvas, h, w } from "./canvas";

export default class ScaledCircle extends Circle {
    constructor() {
        super();
        this.radius = Math.random() * 32;
        this.fill = "red";
        this.pos.set(Math.random() * w,Math.random() * h);
        this.vel.set(Math.random() , Math.random());
        const mouseVec = new Vec(0,0);
        const circleAndMouseDistanceVector = new Vec(w/2,h/2);

        canvas.addEventListener("mousemove", (e) => {

            mouseVec.set(e.pageX, e.pageY);
            mouseVec.sub(circleAndMouseDistanceVector);

            // this.radius = Math.min( mouseVec.mag(), 60);

            console.log(this.radius);
        })
    }
}