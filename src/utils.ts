export const clamp = (val: number, min: number, max: number) => {
  return Math.max(min, Math.min(val, max));
};

export const getRandomNumber = (max: number) => {
  return Math.floor(Math.random() * max);
};
