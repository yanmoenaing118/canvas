import Entity from "./Entity";

export default class Text extends Entity {
    font: string;
    text: string;
    constructor(text: string, font: string) {
        super(0,0,0,0);
        this.text = text;
        this.font = font;
    }
}