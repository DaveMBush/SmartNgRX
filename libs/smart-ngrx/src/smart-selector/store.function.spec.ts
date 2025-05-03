import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { store } from './store.function';

describe('store.function.ts', () => {
  let mockStore: MockStore;
  describe('When we pass a store object to the function', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [provideMockStore({ initialState: { name: 'test' } })],
      });
      mockStore = TestBed.inject(MockStore);
      store(mockStore);
    });
    it("should return the object when we don't pass a parameter", () => {
      expect(store()).toEqual(mockStore);
    });
  });
});
