import { createMockStore } from '@ngrx/store/testing';

import { store } from '../../smart-selector/store.function';

/**
 * Used during unit testing, this creates an empty
 * store and puts it in the store() function
 * so our code can get at it later.
 */
export function createStore(): void {
  store(createMockStore({ initialState: {} }));
}
