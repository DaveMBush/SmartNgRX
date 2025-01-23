import { assert } from '../../common/assert.function';

/**
 * Used during unit testing, this creates an empty
 * store and puts it in the store() function
 * so our code can get at it later.
 */
export function createStore(): void {
  assert(false, 'createStore is not implemented');
  //store(createMockStore({ initialState: {} }));
}
