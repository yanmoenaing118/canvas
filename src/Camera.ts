import Container from "./Container";
import Entity from "./Entity";

export default class Camera extends Container {
    style: { fillStyle?: string | undefined; strokeStyle?: string | undefined; } = {
        strokeStyle: 'pink'
    }
}