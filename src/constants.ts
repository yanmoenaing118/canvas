import KeyControls from "./KeyControls";

export const MAX_FRAME = 1 / 60;
export const SPEED = 1640;
export const CELLSIZE = 64;
export let WIDTH = Math.round(window.innerWidth / CELLSIZE) * CELLSIZE;
export let HEIGHT = Math.round(window.innerHeight / CELLSIZE ) * CELLSIZE;

console.log(WIDTH,HEIGHT)
export const controls = new KeyControls();