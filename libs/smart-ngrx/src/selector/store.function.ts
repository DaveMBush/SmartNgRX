import { Store } from '@ngrx/store';

import { assert } from '../common/assert.function';
import { rootInjector } from '../common/root-injector.function';

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
 * @returns = the global store value.
 */
export function store(): Store {
  if (!globalStore) {
    globalStore = rootInjector.get().get(Store);
  }
  assert(globalStore !== undefined, 'store is undefined');
  return globalStore;
}
