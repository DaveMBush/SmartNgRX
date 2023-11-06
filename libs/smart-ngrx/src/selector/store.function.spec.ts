import { Store } from '@ngrx/store';

import { castTo } from '../common/cast-to.function';
import { store } from './store.function';

describe('store.function.ts', () => {
  describe('When we pass a store object to the function', () => {
    beforeEach(() => {
      store(castTo<Store>({ name: 'test' }));
    });
    it("should return the object when we don't pass a parameter", () => {
      expect(store()).toEqual({ name: 'test' });
    });
  });
});
