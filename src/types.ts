export type Styles = {
    fill?: string,
    stroke?: string,
    font?: string,
    strokeWidth?: number
}

export type Frame = {
    id: string | number,
    x: number,
    y: number,
    meta?: {
        [key: string]: string | number | boolean
    }
}