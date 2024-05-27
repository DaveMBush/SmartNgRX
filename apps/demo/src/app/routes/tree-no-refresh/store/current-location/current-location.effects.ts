// jscpd:ignore-start
// intentionally duplicated.
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, switchMap, withLatestFrom } from 'rxjs';

import { locationActions } from '../locations/location.actions';
import { selectLocationEntities } from '../locations/location.selectors';
import { currentLocationActions } from './current-location.actions';
import { selectCurrentLocationId } from './current-location.selector';

export const locationEqualsLocationId = (id: string) => {
  return (l: string, _: number, __: string[]): boolean => {
    return l === id;
  };
};

export const watchLocations = createEffect(
  /* istanbul ignore next -- not real conditions but injectables */
  (actions = inject(Actions), store = inject(Store)) => {
    return actions.pipe(
      ofType(locationActions.storeRows),
      switchMap(() => store.select(selectLocationEntities)),
      withLatestFrom(store.select(selectCurrentLocationId)),
      map(([locations, locationId]) => {
        return { ids: locations.ids as string[], locationId };
      }),
      filter(
        ({ ids, locationId }) =>
          !ids.some(locationEqualsLocationId(locationId)),
      ),
      map(({ ids }) => {
        const id = ids[0];
        return currentLocationActions.set({ id });
      }),
    );
  },
  {
    functional: true,
  },
);
// jscpd:ignore-end
