import { interval, Observable, tap } from 'rxjs';

import { forNext } from '../common/for-next.function';
import { psi } from '../common/psi.const';
import { globalMarkAndDeleteInit } from './global-mark-and-delete-init.class';
import { markAndDeleteEntities } from './mark-and-delete-entities.class';
import { markAndDeleteEntity } from './mark-and-delete-entity.function';

/**
 * Used internally by mark-and-delete.effect.ts to start an interval
 * that runs to affect markAndDelete functionality
 *
 * @returns Observable<number> - just an observable for the effect to observe
 */
export function markAndDeleteFeaturesInterval(): Observable<number> {
  const markAndDeleteInterval = globalMarkAndDeleteInit.get().runInterval;
  return interval(markAndDeleteInterval).pipe(
    tap(function markAndDeleteFeaturesIntervalTab() {
      const featureKeys = markAndDeleteEntities.entities();
      // for/next is faster than forEach
      forNext(
        featureKeys,
        function markAndDeleteFeaturesIntervalTabForNext(item) {
          markAndDeleteEntity(item.split(psi) as [string, string]);
        },
      );
    }),
  );
}
