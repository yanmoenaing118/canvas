/**
 *
 * @param milli
 * @returns seconds
 */
export function sec(milli: number) {
  return milli * 0.001;
}


export function clamp(x: number,min: number, max: number) {
  return Math.max(min, Math.min(x,max));
}