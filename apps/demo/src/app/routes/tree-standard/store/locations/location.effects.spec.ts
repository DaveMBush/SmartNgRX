import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { TestScheduler } from 'rxjs/testing';

import { actionFactory } from '@smart/smart-ngrx/functions/action.factory';

import { currentLocationActions } from '../current-location/current-location.actions';
import { setLocationIdEffect$ } from './location.effects';
import { selectCurrentLocation } from './location.selectors';

const locationActions = actionFactory<
  { id: string; isDirty: boolean },
  'tree-standard',
  'location'
>('tree-standard', 'location');

describe('Location Effects', () => {
  let testScheduler: TestScheduler;
  let store: Store;

  describe('the current location is ""', () => {
    beforeEach(() => {
      testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
      });
      TestBed.configureTestingModule({
        providers: [
          Actions,
          provideMockStore({
            initialState: {},
            selectors: [
              {
                selector: selectCurrentLocation,
                value: { id: '' },
              },
            ],
          }),
        ],
      });
      store = TestBed.inject(Store) as Store;
    });

    it('should set location id', () => {
      testScheduler.run(({ hot, expectObservable }) => {
        const action = locationActions.loadSuccess({
          rows: [{ id: '1', isDirty: false }],
        });
        const actions = new Actions(hot('-a', { a: action }));
        const effects = setLocationIdEffect$(actions, store);

        expectObservable(effects).toBe('-a', {
          a: currentLocationActions.set({ id: '1' }),
        });
      });
    });
  });

  describe('the current location is "1" and it still exist in the list', () => {
    beforeEach(() => {
      testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
      });
      TestBed.configureTestingModule({
        providers: [
          Actions,
          provideMockStore({
            initialState: {},
            selectors: [
              {
                selector: selectCurrentLocation,
                value: { id: '1' },
              },
            ],
          }),
        ],
      });
      store = TestBed.inject(Store) as Store;
    });

    it('should set location id', () => {
      testScheduler.run(({ hot, expectObservable }) => {
        const action = locationActions.loadSuccess({
          rows: [{ id: '1', isDirty: false }],
        });
        const actions = new Actions(hot('-a', { a: action }));
        const effects = setLocationIdEffect$(actions, store);

        expectObservable(effects).toBe('-a', {
          a: currentLocationActions.set({ id: '1' }),
        });
      });
    });
  });

  describe('the current location is "1" and it is not still in the list', () => {
    beforeEach(() => {
      testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
      });
      TestBed.configureTestingModule({
        providers: [
          Actions,
          provideMockStore({
            initialState: {},
            selectors: [
              {
                selector: selectCurrentLocation,
                value: { id: '1' },
              },
            ],
          }),
        ],
      });
      store = TestBed.inject(Store) as Store;
    });

    it('should set location id to the first available id', () => {
      testScheduler.run(({ hot, expectObservable }) => {
        const action = locationActions.loadSuccess({
          rows: [{ id: '2', isDirty: false }],
        });
        const actions = new Actions(hot('-a', { a: action }));
        const effects = setLocationIdEffect$(actions, store);

        expectObservable(effects).toBe('-a', {
          a: currentLocationActions.set({ id: '2' }),
        });
      });
    });
  });
});
