import { createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { interval, tap } from 'rxjs';

import { assert } from '../common/assert.function';
import { isNullOrUndefined } from '../common/is-null-or-undefined.function';
import { zoneless } from '../common/zoneless.function';
import { actionFactory } from '../functions/action.factory';
import { store } from '../selector/store.function';
import {
  getMarkAndDeleteFeatureMap,
  markAndDeleteFeatures,
} from './mark-and-delete.map';
import { getMarkAndDeleteInit } from './mark-and-delete-init';

const unpatchedInterval = zoneless('interval') as typeof interval;
let storeFunction: Store | undefined;
/**
 * This effect is used to mark and delete the records that need to be
 * refreshed or deleted.
 */
export const markAndDeleteEffect = createEffect(
  () => {
    storeFunction = store();
    assert(!isNullOrUndefined(store), 'could not find store from function');
    const markAndDeleteInterval = getMarkAndDeleteInit('θglobalθ').runInterval;
    const featureKeys = markAndDeleteFeatures();
    return unpatchedInterval(markAndDeleteInterval).pipe(
      tap(() => featureKeys.forEach(markAndDeleteFeature)),
    );
  },
  { dispatch: false, functional: true },
);

function markAndDeleteFeature(featureKey: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- need any here because it is looking for a literal
  const featureAction = actionFactory(featureKey as any);
  const featureMap = getMarkAndDeleteFeatureMap(featureKey);
  const featureInit = getMarkAndDeleteInit(featureKey);
  assert(
    isNullOrUndefined(featureMap),
    `MarkAndDelete feature ${featureKey} is not registered in map`,
  );
  assert(
    isNullOrUndefined(featureInit),
    `MarkAndDelete feature ${featureKey} is not registered in init`,
  );
  const garbageCollectKeys: string[] = [];
  const markDirtyKeys: string[] = [];
  for (const [key, value] of featureMap) {
    if (
      !isNullOrUndefined(featureInit.removeTime) &&
      featureInit.removeTime! > 0 &&
      value < Date.now() - featureInit.removeTime!
    ) {
      garbageCollectKeys.push(key);
    } else if (
      !isNullOrUndefined(featureInit.markDirtyTime) &&
      featureInit.markDirtyTime! > 0 &&
      value < Date.now() - featureInit.markDirtyTime!
    ) {
      markDirtyKeys.push(key);
    } else {
      break;
    }
  }
  requestIdleCallback(
    () => {
      if (garbageCollectKeys.length > 0) {
        storeFunction!.dispatch(
          featureAction.garbageCollect({ ids: garbageCollectKeys }),
        );
      }
      if (markDirtyKeys.length > 0) {
        storeFunction!.dispatch(
          featureAction.markDirty({ ids: markDirtyKeys }),
        );
      }
    },
    { timeout: getMarkAndDeleteInit('θglobalθ').runInterval! - 100 },
  );
}
