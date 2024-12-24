import { createEffect } from '@ngrx/effects';

import { markAndDeleteFeaturesInterval } from './mark-and-delete-effect/mark-and-delete-features-interval.function';

/**
 * This effect is used to mark and delete the records that need to be
 * refreshed or deleted.
 */
export const markAndDeleteEffect = createEffect(
  /* istanbul ignore next -- not optional */
  function markAndDeleteEffectFunction() {
    return markAndDeleteFeaturesInterval();
  },
  { dispatch: false, functional: true },
);
