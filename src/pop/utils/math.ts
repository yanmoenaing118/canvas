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

export default {
  rand,
  randf,
};
