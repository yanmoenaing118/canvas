import Entity from "./Entity";

export default class Text extends Entity {
    text: string;
    constructor(text: string) {
        super(0,0,0,0);
        this.text = text;
    }
}