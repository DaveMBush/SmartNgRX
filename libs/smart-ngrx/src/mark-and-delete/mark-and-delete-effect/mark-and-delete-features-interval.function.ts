import { interval, tap } from 'rxjs';

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
  const featureKeys = markAndDeleteEntities();
  interval(markAndDeleteInterval)
    .pipe(
      tap(() => {
        const featureKeyLength = featureKeys.length;
        // for/next is faster than forEach
        for (let i = 0; i < featureKeyLength; i++) {
          markAndDeleteEntity(
            featureKeys[i].split(psi) as [
              StringLiteralSource<string>,
              StringLiteralSource<string>,
            ],
          );
        }
      }),
    )
    .subscribe();
}
