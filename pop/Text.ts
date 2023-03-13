type Pos = {
    x: number,
    y: number
}

export default class Text {
    text: string;
    pos: Pos;
    style: any;
    visible: boolean = true;

    update: (delta: number, t: number) => void;
    constructor(text = "", style={}) {
        this.text = text;
        this.style = style;
        this.pos = { x: 0, y: 0};
    }
}