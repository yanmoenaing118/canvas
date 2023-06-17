import Container from "./Container"
import Entity from "./Entity"

export type Collection = Container[] & Entity[];

export type Position = {
    x: number,
    y: number
}