import { inject, NgZone } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { of } from 'rxjs';

import { assert } from '../common/assert.function';
import { isNullOrUndefined } from '../common/is-null-or-undefined.function';
import { store } from '../selector/store.function';
import { markAndDeleteFeaturesInterval } from './mark-and-delete-effect/mark-and-delete-features-interval.function';

/**
 * This effect is used to mark and delete the records that need to be
 * refreshed or deleted.
 */
export const markAndDeleteEffect = createEffect(
  /* istanbul ignore next -- zone is passed in from test */
  (zone = inject(NgZone)) => {
    assert(!isNullOrUndefined(store), 'could not find store from function');
    zone.runOutsideAngular(markAndDeleteFeaturesInterval);
    return of(null);
  },
  { dispatch: false, functional: true },
);
