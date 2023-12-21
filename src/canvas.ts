export const canvas = document.createElement("canvas") as HTMLCanvasElement;

export const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

document.body.appendChild(canvas);
export const w = 19 * 32;
export const h = 17 * 32;
canvas.width = w;
canvas.height = h;

const dpr = window.devicePixelRatio;

const rect = canvas.getBoundingClientRect();

canvas.width = rect.width * dpr;
canvas.height = rect.height * dpr;

ctx.scale(dpr, dpr);

canvas.style.width = `${rect.width}px`;
canvas.style.height = `${rect.height}px`;
canvas.style.boxShadow = "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)";


export const colors: {[key: string]: string} = {
    R: "red",
    G: "green",
    B: "black",
    P: "pink",
    C: "cyan",
    A: "gold"

}
