import { inject } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { store as storeFunction } from './store.function';

/**
 * This is the Effect that is used to provide a store that is
 * globally accessible to the application.
 */
export const storeEffect = createEffect(
  /* istanbul ignore next -- inject() can't be called from test so it is passed in */
  function storeEffectFunction(store: Store = inject(Store)) {
    storeFunction(store);
    return of(null);
  },
  { dispatch: false, functional: true },
);
