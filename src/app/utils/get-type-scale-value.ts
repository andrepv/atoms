export function getScaleValue(index: number, ratio: number, base: number) {
  const n = index - 1;
  const value = base * Math.pow(ratio, n);
  return Number(value.toFixed(3));
}