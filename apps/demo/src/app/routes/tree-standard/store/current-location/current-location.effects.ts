// jscpd:ignore-start
// intentionally duplicated.
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { debounceTime, filter, map, switchMap, withLatestFrom } from 'rxjs';

import { locationActions } from '../locations/location.actions';
import { selectLocationEntities } from '../locations/selectors/select-location-entities.selectors';
import { currentLocationActions } from './current-location.actions';
import { selectCurrentLocationId } from './current-location.selector';

function locationEqualsLocationId(id: string) {
  return function locationEqualsLocationIdFunction(l: string): boolean {
    return l === id;
  };
}

export const watchLocations = createEffect(
  /* istanbul ignore next -- not real conditions but injectables */
  function watchLocationsFunction(
    actions = inject(Actions),
    store = inject(Store),
  ) {
    return actions.pipe(
      ofType(locationActions.storeRows),
      switchMap(function watchLocationsSwitchMapFunction() {
        return store.select(selectLocationEntities);
      }),
      withLatestFrom(store.select(selectCurrentLocationId)),
      map(function watchLocationsMapFunction([locations, locationId]) {
        return {
          ids: locations.ids as string[],
          locationId,
        };
      }),
      filter(function watchLocationsFilterFunction({ ids, locationId }) {
        return !ids.some(locationEqualsLocationId(locationId));
      }),
      // debounceTime is an easy way to do setTimeout without using setTimeout
      // we need to do this to cause the mat-select to select an item after the
      // items are loaded because of a bug with mat-select
      debounceTime(100),
      map(function watchLocationsMapFunction({ ids }) {
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
