import { Signal } from '@angular/core';
import { MemoizedSelector } from '@ngrx/store';

/**
 * Converts an Angular signal into a memoized selector compatible with NgRx's
 * createSelector. This allows for gradual migration from NgRx to signals while
 * maintaining compatibility with existing selector chains.
 *
 * @param signal The Angular signal to convert
 * @returns A memoized selector that reflects the signal's current value
 */
export function signalToSelector<T>(
  signal: Signal<T>,
): MemoizedSelector<object, T> {
  let lastValue: T;
  let lastState: object | null = null;

  function memoizedSignalSelector(state: object): T {
    if (state === lastState && lastValue !== undefined) {
      return lastValue;
    }

    lastState = state;
    lastValue = signal();
    return lastValue;
  }

  return Object.assign(memoizedSignalSelector, {
    release: function signalSelectorRelease() {
      lastState = null;
    },
    projector: function signalSelectorProjector(_: object) {
      return signal();
    },
    setResult: function signalSelectorSetResult(result: T) {
      lastValue = result;
    },
  }) as MemoizedSelector<object, T>;
}
