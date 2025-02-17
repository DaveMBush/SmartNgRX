import { ProviderToken, Signal } from '@angular/core';
import { MemoizedSelector } from '@ngrx/store';

import { rootInjector } from '../common/root-injector.function';

/**
 * Converts an Angular signal into a memoized selector compatible with NgRx's
 * createSelector. This allows for gradual migration from NgRx to signals while
 * maintaining compatibility with existing selector chains.
 *
 * @param signalToken The Angular signalStore token that holds the signal to convert
 * @param projector The function that projects that picks out the signal from the store
 * @returns A memoized selector that reflects the signal's current value
 */
export function signalTokenToSelector<T, S>(
  signalToken: ProviderToken<T>,
  projector: (value: T) => Signal<S>,
): MemoizedSelector<object, S> {
  const signalService = rootInjector.get().get<T>(signalToken);
  const signal = projector(signalService);
  let lastValue: S = signal();

  // Create the selector function
  function memoizedSignalSelector(_: object): S {
    console.log('memoizedSignalSelector - lastValue', lastValue);
    const newValue = signal();
    console.log('memoizedSignalSelector - newValue', newValue);
    if (newValue !== lastValue) {
      lastValue = newValue;
    }
    return lastValue;
  }

  // Add required NgRX selector properties
  Object.defineProperties(memoizedSignalSelector, {
    release: {
      writable: false,
      enumerable: false,
      value: function signalSelectorRelease(): void {
        // No cleanup needed
      },
    },
    projector: {
      writable: false,
      enumerable: false,
      value: function signalSelectorProjector(_: object): S {
        return signal();
      },
    },
    setResult: {
      writable: false,
      enumerable: false,
      value: function signalSelectorSetResult(result: S): void {
        lastValue = result;
      },
    },
  });

  return memoizedSignalSelector as MemoizedSelector<object, S>;
}
