type Pos = {
    x: number,
    y: number
}

export default class Text {
    text: string;
    pos: Pos;
    style: any;
    constructor(text = "", style={}) {
        this.text = text;
        this.style = style;
        this.pos = { x: 0, y: 0};
    }
}