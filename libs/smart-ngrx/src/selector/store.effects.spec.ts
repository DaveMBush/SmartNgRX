import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { storeEffect } from './store.effects';
import { store as storeFunction } from './store.function';

describe('storeEffect', () => {
  describe('when we call the effect', () => {
    let store: MockStore;
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [provideMockStore()],
      });
      store = TestBed.inject(MockStore);
    });
    it('should call the store function', () => {
      storeEffect(store).subscribe(() => {
        expect(storeFunction()).toBeTruthy();
      });
    });
  });
});
