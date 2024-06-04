/**
 * In worklet
 * e.g. runOnJS(lop)(...);
 */
export function log(...msg: unknown[]) {
  console.log(...msg);
}

export function round(number: number) {
  'worklet';
  return Math.round(number);
}
