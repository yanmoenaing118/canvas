export class Vec2 {
    constructor(public x: number, public y: number) {

    }
}

export type TileSpriteFrame = {
    x: number, 
    y: number,
    [key: string]: string | boolean | number
}