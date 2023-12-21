export const clamp = (val: number, min: number, max: number) => {
  return Math.max(min, Math.min(val, max));
};

export const getRandomNumber = (max: number) => {
  return Math.floor(Math.random() * max);
};

export class SimpleRandomGenerator {
  state: number;
  constructor(seed: number) {
    this.state = seed;
  }

  next() {
    // Linear Congruential Generator parameters
    const a = 1664525;
    const c = 1013904223;
    const m = Math.pow(2, 32);

    // Update the state using the linear congruential formula
    this.state = (a * this.state + c) % m;

    // Return a normalized value between 0 and 1
    return this.state / m;
  }
}
