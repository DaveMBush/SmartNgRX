import { Store } from '@ngrx/store';

/**
 * This code allows us to make the store globally available without using dependency injection.
 *
 * This is set by the StoreEffects code where DI puts it in the constructor which then calls
 * this function.
 */
export let globalStore: Store | undefined;

/**
 *
 * @param storeParam - This is an optional parameter.  If it is there,
 *     we set the store.  Otherwise, we use what is already set.
 * @returns = the global store value.
 */

// eslint-disable-next-line ngrx/use-consistent-global-store-name -- it is either this or get a shadowing lint issue
export function store(storeParam?: Store): Store | undefined {
  if (storeParam) {
    globalStore = storeParam;
  }
  return globalStore;
}
