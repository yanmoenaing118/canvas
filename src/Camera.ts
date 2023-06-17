import Container from "./Container";
import Entity from "./Entity";
import { clamp } from "./helpers";
import { Position } from "./types";

export default class Camera extends Container {
    style: { fillStyle?: string | undefined; strokeStyle?: string | undefined; } = {
        strokeStyle: 'pink'
    }
    subject: Entity;
    offset: Position = { x: 0, y: 0};
    worldSize: { w: number, h: number};

    constructor(x: number, y: number, w: number, h: number, worldSize: {w: number, h: number},subject: Entity) {
        super(x,y,w,h);
        this.worldSize = worldSize;
        this.subject = subject;
        this.setSubject(subject);

    }

    setSubject(this: Camera,e: Entity) {
        this.subject = e;
        this.offset.x = e.w / 2;
        this.offset.y = e.h / 2;
    }

    focus(this: Camera) {
        const { subject, offset, worldSize, w,h } = this;

        const maxX = worldSize.w - w;
        const centeredX = subject.pos.x + offset.x - w / 2;
        const x = -clamp(centeredX, 0, maxX);

        const maxY = worldSize.h - h;
        const centeredY = subject.pos.y + offset.y  - h / 2;
        const y = -clamp(centeredY, 0, maxY);

        this.pos.x = x;
        this.pos.y = y;
    }


    update(this: Camera): void {
        this.focus();
    }
}