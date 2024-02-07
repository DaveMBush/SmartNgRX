import { cleanUpString } from './clean-up-string.function';

export function compareLines(
  i: number,
  sourceLeakTrace: string[],
  foundLeakTrace: string[][],
  failMap: Map<number, number>,
): void {
  const sourceLine = cleanUpString(sourceLeakTrace[i]);
  for (let targetI = 0; targetI < foundLeakTrace.length; targetI++) {
    if (failMap.has(targetI)) {
      continue;
    }
    if (targetI === foundLeakTrace.length) {
      failMap.set(targetI, i);
      continue;
    }
    const targetLine = cleanUpString(foundLeakTrace[targetI][i]);
    if (targetLine !== sourceLine) {
      failMap.set(targetI, i);
    }
  }
}
