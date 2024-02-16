import { compareLines } from './compare-lines.function';
import { LeakItem } from './leak-item.interface';

export function refineLeak(
  sourceLeakTraceSummary: string,
  foundLeaks: LeakItem[],
): LeakItem | null {
  const failMap = new Map<number, number>();
  const sourceLeakTrace = sourceLeakTraceSummary.split('\n');

  const foundLeakTrace = foundLeaks.map((lt) =>
    lt.leakTraceSummary.split('\n'),
  );
  // eslint-disable-next-line no-constant-condition -- easy way to do a while and increment i.
  for (let i = 0; true; i++) {
    if (i === sourceLeakTrace.length) {
      break;
    }
    compareLines(i, sourceLeakTrace, foundLeakTrace, failMap);
  }
  // Now look at failMap and see which one failed last.
  let maxFail = 0;
  let maxFailIndex = 0;
  for (let targetI = 0; targetI < foundLeakTrace.length; targetI++) {
    if (!failMap.has(targetI)) {
      return foundLeaks[targetI];
    }
    const currentFail = failMap.get(targetI)!;
    if (currentFail > maxFail) {
      maxFail = currentFail;
      maxFailIndex = targetI;
    }
  }
  // make sure there is only one trace that failed at maxFail location.
  const allMaxFailed = Array.from(failMap.values()).filter(
    (v) => v === maxFail,
  );
  if (allMaxFailed.length > 1) {
    console.log('Multiple traces failed at the same location.');
    return null;
  }
  return foundLeaks[maxFailIndex];
}
