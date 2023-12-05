import { inject, NgZone } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { interval, of, tap } from 'rxjs';

import { assert } from '../common/assert.function';
import { isNullOrUndefined } from '../common/is-null-or-undefined.function';
import { actionFactory } from '../functions/action.factory';
import { StringLiteralSource } from '../ngrx-internals/string-literal-source.type';
import { store } from '../selector/store.function';
import {
  getMarkAndDeleteFeatureMap,
  markAndDeleteFeatures,
} from './mark-and-delete.map';
import { getMarkAndDeleteInit } from './mark-and-delete-init';

let storeFunction: Store | undefined;
/**
 * This effect is used to mark and delete the records that need to be
 * refreshed or deleted.
 */
export const markAndDeleteEffect = createEffect(
  /* istanbul ignore next -- zone is passed in from test */
  (zone = inject(NgZone)) => {
    storeFunction = store();
    assert(!isNullOrUndefined(store), 'could not find store from function');
    zone.runOutsideAngular(markAndDeleteFeaturesInterval);
    return of(null);
  },
  { dispatch: false, functional: true },
);

function markAndDeleteFeaturesInterval(): void {
  const markAndDeleteInterval = getMarkAndDeleteInit('θglobalθ').runInterval;
  const featureKeys = markAndDeleteFeatures();
  interval(markAndDeleteInterval)
    .pipe(
      tap(() =>
        featureKeys.forEach((key) =>
          markAndDeleteFeature(key as StringLiteralSource<typeof key>),
        ),
      ),
    )
    .subscribe();
}

function markAndDeleteFeature<F extends string>(
  featureKey: StringLiteralSource<F>,
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- need any here because it is looking for a literal
  const featureMap = getMarkAndDeleteFeatureMap(featureKey);
  const featureInit = getMarkAndDeleteInit(featureKey);
  assert(
    !isNullOrUndefined(featureMap),
    `MarkAndDelete feature ${featureKey} is not registered in map`,
  );
  assert(
    !isNullOrUndefined(featureInit),
    `MarkAndDelete feature ${featureKey} is not registered in init`,
  );
  const garbageCollectKeysMap: Record<string, string[] | undefined> = {};
  const markDirtyKeysMap: Record<string, string[] | undefined> = {};
  for (const [key, value] of featureMap) {
    if (
      !isNullOrUndefined(featureInit.removeTime) &&
      featureInit.removeTime! > 0 &&
      value < Date.now() - featureInit.removeTime!
    ) {
      const splitKey = key.split('θ');
      garbageCollectKeysMap[splitKey[0]] =
        garbageCollectKeysMap[splitKey[0]] || [];
      garbageCollectKeysMap[splitKey[0]]!.push(splitKey[1]);
    } else if (
      !isNullOrUndefined(featureInit.markDirtyTime) &&
      featureInit.markDirtyTime! > 0 &&
      value < Date.now() - featureInit.markDirtyTime!
    ) {
      const splitKey = key.split('θ');
      markDirtyKeysMap[splitKey[0]] = markDirtyKeysMap[splitKey[0]] || [];
      markDirtyKeysMap[splitKey[0]]!.push(splitKey[1]);
    } else {
      break;
    }
  }
  processMarkAndDelete(
    featureKey as StringLiteralSource<string>,
    garbageCollectKeysMap,
    markDirtyKeysMap,
  );
}

function processMarkAndDelete(
  featureKey: StringLiteralSource<string>,
  garbageCollectKeysMap: Record<string, string[] | undefined>,
  markDirtyKeysMap: Record<string, string[] | undefined>,
) {
  requestIdleCallback(
    () => {
      Object.keys(garbageCollectKeysMap)
        .filter(
          (key) =>
            !isNullOrUndefined(garbageCollectKeysMap[key]) &&
            garbageCollectKeysMap[key]!.length,
        )
        .forEach((key) => {
          const featureAction = actionFactory(
            featureKey,
            key as StringLiteralSource<typeof key>,
          );
          storeFunction!.dispatch(
            featureAction.garbageCollect({ ids: garbageCollectKeysMap[key]! }),
          );
        });
      Object.keys(markDirtyKeysMap)
        .filter(
          (key) =>
            !isNullOrUndefined(markDirtyKeysMap[key]) &&
            markDirtyKeysMap[key]!.length,
        )
        .forEach((key) => {
          const featureAction = actionFactory(
            featureKey,
            key as StringLiteralSource<typeof key>,
          );
          storeFunction!.dispatch(
            featureAction.markDirty({ ids: markDirtyKeysMap[key]! }),
          );
        });
    },
    { timeout: getMarkAndDeleteInit('θglobalθ').runInterval! - 100 },
  );
}
