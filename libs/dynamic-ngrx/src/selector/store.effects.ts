import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { store } from './store.function';

@Injectable()
export class StoreEffects {
  constructor(
    // eslint-disable-next-line ngrx/use-consistent-global-store-name -- this is needed because we are calling the function store()
    storeInstance: Store
  ) {
    store(storeInstance);
  }
}
