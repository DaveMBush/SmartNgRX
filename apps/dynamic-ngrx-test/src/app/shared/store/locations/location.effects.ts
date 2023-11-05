import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap, withLatestFrom } from 'rxjs';

import { castTo } from '@davembush/dynamic-ngrx/common/cast-to.function';
import { actionFactory } from '@davembush/dynamic-ngrx/functions/action.factory';
import { RowsProp } from '@davembush/dynamic-ngrx/types/rows-prop.interface';

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
  (actions$ = inject(Actions), store = inject(Store)) => {
    return actions$.pipe(
      ofType(locationActions.loadSuccess),
      withLatestFrom(store.select(selectCurrentLocation)),
      tap(([locations, currentLocation]) => {
        const locs = castTo<RowsProp<Location>>(locations);
        if (
          currentLocation.id.length > 0 &&
          locs.rows.some(locationIdExist(currentLocation))
        ) {
          return;
        }
        store.dispatch(
          currentLocationActions.set({
            id: locs.rows[0].id,
          }),
        );
      }),
    );
  },
  { dispatch: false, functional: true },
);
