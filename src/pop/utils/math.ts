import { Position } from "../models";
// return rand float
function randf(min?: number, max?: number): number {
  if (max == undefined) {
    max = min || 1;
    min = 0;
  }
  if (typeof min === "number") {
    return Math.random() * (max - min) + min;
  }
  return Math.random();
}

// return rand integer
function rand(min?: number, max?: number) {
  return Math.floor(randf(min, max));
}

/**
 * 
 * @param max 
 * @returns c
 */
function randOneIn(max = 2) {
  return rand(0, max) == 0;
}

/**
 * 
 * @param array 
 * @returns return a random element from the array
 */
function randOneFrom<T>(array: Array<T>): T {
  return array[rand(array.length)];
}

const distance = (a: Position, b: Position) => {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
};

export default {
  rand,
  randf,
  randOneIn,
  randOneFrom,
  distance
};
