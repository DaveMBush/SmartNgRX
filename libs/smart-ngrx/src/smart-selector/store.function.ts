import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { assert, rootInjector } from '@smarttools/smart-core';

/**
 * This code allows us to make the store globally available without using dependency injection.
 *
 * This is set by the StoreEffects code where DI puts it in the constructor which then calls
 * this function.
 */
let globalStore: Store | undefined;

/**
 * Internal function used to provide and retrieve a global store
 * that is needed by code that does not have DI.
 *
 * @param mockStore optional mock store to use for testing.
 *
 * @returns = the global store value.
 */
export function store(mockStore?: MockStore): Store {
  if (mockStore !== undefined) {
    globalStore = mockStore;
    return globalStore;
  }
  /* istanbul ignore next -- not testable because we can't clear globalStore in a clean manner */
  if (globalStore === undefined) {
    globalStore = rootInjector.get().get(Store);
  }
  assert(globalStore !== undefined, 'store is undefined');
  return globalStore;
}
