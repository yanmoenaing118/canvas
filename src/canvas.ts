export const canvas = document.createElement("canvas") as HTMLCanvasElement;

export const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

document.body.appendChild(canvas);
const w = 640;
const h = 320;
canvas.width = w;
canvas.height = h;

const dpr = window.devicePixelRatio;

const rect = canvas.getBoundingClientRect();

canvas.width = rect.width * dpr;
canvas.height = rect.height * dpr;

ctx.scale(dpr, dpr);

canvas.style.width = `${rect.width}px`;
canvas.style.height = `${rect.height}px`;

