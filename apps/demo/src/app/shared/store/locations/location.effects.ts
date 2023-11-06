import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, withLatestFrom } from 'rxjs';

import { castTo } from '@smart/smart-ngrx/common/cast-to.function';
import { actionFactory } from '@smart/smart-ngrx/functions/action.factory';
import { RowsProp } from '@smart/smart-ngrx/types/rows-prop.interface';

import { currentLocationActions } from '../../current-location/current-location.actions';
import { Location } from './location.interface';
import { selectCurrentLocation } from './location.selectors';

/**
 * This is how we access the actions we've already defined in the
 * store for location.
 */
const locationActions = actionFactory('location');

function locationIdExist(
  currentLocation: Location,
): (location: Location) => boolean {
  return (location: Location) => currentLocation.id === location.id;
}

/**
 * Create a new effect that will allow us to take the return value
 * that comes from load action and set the current location to the
 * first location in the list if it hasn't already been set or
 * the current location no longer exist.
 */
export const setLocationIdEffect$ = createEffect(
  // the parameters are tested by passing them in directly
  // so there is no way to test the injection other than
  // at runtime where it obviously works (or not)
  (
    /* istanbul ignore next */
    actions$ = inject(Actions),
    /* istanbul ignore next */
    store = inject(Store),
  ) => {
    return actions$.pipe(
      ofType(locationActions.loadSuccess),
      withLatestFrom(store.select(selectCurrentLocation)),
      map(([locations, currentLocation]) => {
        const locs = castTo<RowsProp<Location>>(locations);
        if (
          currentLocation.id.length > 0 &&
          locs.rows.some(locationIdExist(currentLocation))
        ) {
          return currentLocationActions.set({ id: currentLocation.id });
        }
        return currentLocationActions.set({
          id: locs.rows[0].id,
        });
      }),
    );
  },
  { functional: true },
);
