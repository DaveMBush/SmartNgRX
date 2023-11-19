import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { store } from './store.function';
/**
 * This is the Effect that is used to provide a store that is
 * globally accessible to the application.
 */
@Injectable()
export class StoreEffects {
  /**
   * This is the constructor that is used to set the global store.
   * @param storeInstance
   */
  constructor(
    // eslint-disable-next-line ngrx/use-consistent-global-store-name -- this is needed because we are calling the function store()
    storeInstance: Store,
  ) {
    store(storeInstance);
  }
}
