import { Anim } from "./AnimationManager"

export type Position = {
    x: number,
    y: number
}

export type Frame = {
    x: number,
    y: number
}

export type AnimSignature = {
    [key: string]: Anim
}