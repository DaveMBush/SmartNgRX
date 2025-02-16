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
  projector: (value: T) => Signal<S>
): MemoizedSelector<object, S> {
  const signalService = rootInjector.get().get<T>(signalToken);
  const signal = projector(signalService);
  let lastValue: S;
  let lastState: object | null = null;

  function memoizedSignalSelector(state: object): S {
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
    setResult: function signalSelectorSetResult(result: S) {
      lastValue = result;
    },
  }) as MemoizedSelector<object, S>;
}
