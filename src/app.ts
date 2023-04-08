import { Rect } from "./Shapes";
import { Position } from "./types";

const canvas = document.querySelector('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
const { width, height } = canvas;


const rect1 = new Rect(0,0,40,40, 'green');
const rect2  = new Rect(width - 40, 0, 40,40, 'red');

let dt = 0;
let lastTimeStamp = 0;



function loop(ellapsedTime: number){ 

    dt = (ellapsedTime - lastTimeStamp ) * 0.001;
    lastTimeStamp = ellapsedTime;


    update(dt, ellapsedTime);
    render();

    requestAnimationFrame(loop);
}

function update(dt: number,ellapsedTime: number) {

    /**
     * Check Collision Between two rectangles
     */

    if(isCollide(rect1,rect2)) {
        rect1.pos.x -= 1000 * dt;
        rect2.pos.x +=  1000 * dt ;
    } else {
        rect1.pos.x += 100 * dt;
        rect2.pos.x -= 100 * dt;    
    }
}

function isCollide<T1 extends { pos: Position, width: number, height: number }>(obj1: T1, obj2: T1): boolean {

    let obj1Left = obj1.pos.x;
    let obj1Right = obj1.pos.x + obj1.width;
    let obj1Top = obj1.pos.y;
    let obj1Bottom = obj1.pos.y + obj1.height;

    let obj2Left = obj2.pos.x;
    let obj2Right = obj2.pos.x + obj2.width;
    let obj2Top = obj2.pos.y;
    let obj2Bottom = obj2.pos.y + obj2.height;

    if(
        obj1Left < obj2Right &&
        obj1Right > obj2Left &&
        obj1Top < obj2Bottom &&
        obj1Bottom > obj2Top
    ) {
        return true;
    } 


    return false;
}

function render() {
    ctx.clearRect(0,0,width,height);

    ctx.save();
    ctx.fillStyle = rect1.fill;
    ctx.translate(rect1.pos.x,rect1.pos.y);
    ctx.fillRect(0,0,rect1.width,rect1.height)
    ctx.restore();


    ctx.save();
    ctx.fillStyle = rect2.fill;
    ctx.translate(rect2.pos.x, rect2.pos.y);
    ctx.fillRect(0,0,rect2.width, rect2.height);
    ctx.restore();


}


requestAnimationFrame(loop);