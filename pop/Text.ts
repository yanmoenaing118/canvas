type Pos = {
    x: number,
    y: number
}

export type TextStyle = {
    font: string,
    fill: string,
    align: CanvasTextAlign
}

export default class Text {
    text: string;
    pos: Pos;
    style: TextStyle;
    visible: boolean = true;

    update: ((delta: number, t: number) => void) | undefined;
    constructor(text = "", style: TextStyle) {
        this.text = text;
        this.style = style;
        this.pos = { x: 0, y: 0};
    }
}