import { inject, NgZone } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { mergeMap, of } from 'rxjs';

import { ActionGroup } from '../../functions/action-group.interface';
import { SmartNgRXRowBase } from '../../types/smart-ngrx-row-base.interface';
import { bufferAction } from '../buffer-action.function';

/**
 * This is the effect that queues up the ids so the dummy records can be
 * loaded into the store while the service is retrieving the real records.
 *
 * @param actions the action group for the source provided
 * @returns the LoadByIdesPreload effect
 */
export function loadByIdsPreloadEffect<T extends SmartNgRXRowBase>(
  actions: ActionGroup<T>,
) {
  return (
    /* istanbul ignore next -- default value, not really a condition */
    actions$ = inject(Actions),
    /* istanbul ignore next -- default value, not really a condition */
    zone: NgZone = inject(NgZone),
  ) => {
    return actions$.pipe(
      ofType(actions.loadByIds),
      bufferAction(zone),
      mergeMap((ids) => of(actions.loadByIdsPreload({ ids }))),
    );
  };
}
