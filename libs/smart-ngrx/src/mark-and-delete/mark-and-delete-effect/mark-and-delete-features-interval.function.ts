import { interval, tap } from 'rxjs';

import { forNext } from '../../common/for-next.function';
import { psi } from '../../common/theta.const';
import { StringLiteralSource } from '../../ngrx-internals/string-literal-source.type';
import { markAndDeleteEntities } from '../mark-and-delete-entity.map';
import { getGlobalMarkAndDeleteInit } from '../mark-and-delete-init';
import { markAndDeleteEntity } from './mark-and-delete-entity.function';

/**
 * Used internally by mark-and-delete.effect.ts to start an interval
 * that runs to affect markAndDelete functionality
 */
export function markAndDeleteFeaturesInterval(): void {
  const markAndDeleteInterval = getGlobalMarkAndDeleteInit().runInterval;
  interval(markAndDeleteInterval)
    .pipe(
      tap(() => {
        const featureKeys = markAndDeleteEntities();
        // for/next is faster than forEach
        forNext(featureKeys, (item) =>
          markAndDeleteEntity(
            item.split(psi) as [
              StringLiteralSource<string>,
              StringLiteralSource<string>,
            ],
          ),
        );
      }),
    )
    .subscribe();
}
