import { Anim } from "./Entities"

export interface Position {
    x: number,
    y: number
}

export interface Frame {
    x: number,
    y: number
}

export interface Anims {
    [key: string]: Anim
}