import { createEffect } from '@ngrx/effects';

import { functionEffectNoDispatch } from '../constants/function-effect-no-dispatch.const';
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
  functionEffectNoDispatch,
);
