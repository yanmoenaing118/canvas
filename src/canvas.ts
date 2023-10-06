export const canvas = document.createElement("canvas") as HTMLCanvasElement;

export const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

document.body.appendChild(canvas);
export const w = 12 * 64;
export const h = 8 * 64;
canvas.width = w;
canvas.height = h;

const dpr = window.devicePixelRatio;

const rect = canvas.getBoundingClientRect();

canvas.width = rect.width * dpr;
canvas.height = rect.height * dpr;

ctx.scale(dpr, dpr);

canvas.style.width = `${rect.width}px`;
canvas.style.height = `${rect.height}px`;


export const colors: {[key: string]: string} = {
    R: "red",
    G: "green",
    B: "black",
    P: "pink",
    C: "cyan",

}
