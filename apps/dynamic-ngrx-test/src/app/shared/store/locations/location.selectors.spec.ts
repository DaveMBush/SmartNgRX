import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { firstValueFrom, take } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { store as storeFunction } from '@davembush/dynamic-ngrx/selector/store.function';

import { SharedState, SharedState2 } from '../../shared-state.interface';
import { Department } from '../department/department.interface';
import { locationActions } from './location.actions';
import { Location } from './location.interface';
import {
  selectCurrentLocation,
  selectLocation,
  selectLocationsDepartments,
} from './location.selectors';

const storeNotDefined = 'store not defined';

const locationName = 'test location';

describe('Location Selectors', () => {
  let store:
    | MockStore<{ shared: SharedState; shared2: SharedState2 }>
    | undefined;
  describe('selectLocation', () => {
    describe('if no items are loaded for locations', () => {
      const initialState = {
        shared: {
          departments: {
            ids: [],
            entities: {},
          },
          locations: {
            ids: [],
            entities: {},
          },
          departmentChildren: {
            ids: [],
            entities: {},
          },
        },
        shared2: {
          currentLocation: '',
        },
      };

      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [provideMockStore({ initialState })],
        });

        store = TestBed.inject(MockStore);
        storeFunction(store);
      });

      it('should select locations and trigger load action if empty', async () => {
        if (!store) {
          throw new Error(storeNotDefined);
        }
        store.setState({
          shared: initialState.shared,
          shared2: initialState.shared2,
        });
        const result = (await firstValueFrom(
          store.select(selectLocation),
        )) as typeof initialState.shared.locations;

        expect(result).toEqual(initialState.shared.locations);
        // Here, you would also check if `locationActions.load` has been dispatched.
        const loadAction = await firstValueFrom(store.scannedActions$);
        expect(loadAction.type).toEqual(locationActions.load.type);
      });
      it('should select locations and not trigger load action if not empty even if currentLocation is empty', async () => {
        if (!store) {
          throw new Error(storeNotDefined);
        }
        store.setState({
          shared: { ...initialState.shared },
          shared2: { currentLocation: '' },
        });

        const result = (await firstValueFrom(
          store.select(selectLocation),
        )) as typeof initialState.shared.locations;

        expect(result).toEqual(initialState.shared.locations);
        // Here, you would also check if `locationActions.load` has been dispatched.
        const loadAction = await firstValueFrom(store.scannedActions$);
        expect(loadAction.type).toEqual(locationActions.load.type);
      });
    });
    describe('if we have at least one row loaded in locations', () => {
      let testScheduler: TestScheduler;

      const initialState = {
        shared: {
          departments: {
            ids: [],
            entities: {},
          },
          locations: {
            ids: ['1'],
            entities: {
              '1': {
                id: '1',
                name: 'test',
                children: [],
              },
            },
          },
          departmentChildren: {
            ids: [],
            entities: {},
          },
        },
        shared2: {
          currentLocation: '1',
        },
      };

      beforeEach(() => {
        testScheduler = new TestScheduler((actual, expected) => {
          expect(actual).toEqual(expected);
        });

        TestBed.configureTestingModule({
          providers: [provideMockStore({ initialState })],
        });

        store = TestBed.inject(MockStore);
        storeFunction(store);
      });

      it('should select locations and not trigger load action if empty', async () => {
        await testScheduler.run(async ({ expectObservable }) => {
          if (!store) {
            throw new Error(storeNotDefined);
          }
          store.setState({
            shared: initialState.shared,
            shared2: initialState.shared2,
          });
          // eslint-disable-next-line rxjs/no-unsafe-first -- need for this test
          const action = store.scannedActions$.pipe(take(1));

          const result = (await firstValueFrom(
            store.select(selectLocation),
          )) as typeof initialState.shared.locations;

          expect(result).toEqual(initialState.shared.locations);

          expectObservable(action).toBe('');
        });
      });
      it('should select locations and not trigger load action if not empty even if currentLocation is empty', async () => {
        await testScheduler.run(async ({ expectObservable }) => {
          if (!store) {
            throw new Error(storeNotDefined);
          }
          store.setState({
            shared: { ...initialState.shared },
            shared2: { currentLocation: '' },
          });
          // eslint-disable-next-line rxjs/no-unsafe-first -- need for this test
          const action = store.scannedActions$.pipe(take(1));

          const result = (await firstValueFrom(
            store.select(selectLocation),
          )) as typeof initialState.shared.locations;

          expect(result).toEqual(initialState.shared.locations);

          expectObservable(action).toBe('');
        });
      });
    });
  });
  describe('selectLocationsDepartments', () => {
    const initialState = {
      shared: {
        departments: {
          ids: ['1'],
          entities: {
            '1': {
              id: '1',
              name: 'test department',
              children: [],
              lastUpdate: 0,
              isDirty: false,
            } as SharedState['departments']['entities']['1'],
          },
        },
        locations: {
          ids: ['1'],
          entities: {
            '1': {
              id: '1',
              name: locationName,
              children: [] as
                | (Department & { lastUpdate: number })[]
                | string[],
            },
          },
        },
        departmentChildren: {
          ids: [],
          entities: {},
        },
      },
      shared2: {
        currentLocation: '',
      },
    };

    describe('when locations has no children', () => {
      it('should return location but not departments', async () => {
        if (!store) {
          throw new Error(storeNotDefined);
        }

        // Set the state if necessary
        store.setState({
          shared: initialState.shared,
          shared2: initialState.shared2,
        });

        // Get the first emitted value from the selector
        const result = (await firstValueFrom(
          store.select(selectLocationsDepartments),
        )) as typeof initialState.shared.locations;

        // Perform the assertion
        expect(result).toEqual(initialState.shared.locations);
      });
    });
    describe('when locations has a child that points to a department and the department exist in the store', () => {
      it('should return location but and departments', async () => {
        if (!store) {
          throw new Error(storeNotDefined);
        }

        // Set the state if necessary
        store.setState({
          shared: {
            ...initialState.shared,
            locations: {
              ids: ['1'],
              entities: {
                '1': {
                  id: '1',
                  name: locationName,
                  children: ['1'],
                },
              },
            },
          },
          shared2: initialState.shared2,
        });

        // Get the first emitted value from the selector
        const result = (await firstValueFrom(
          store.select(selectLocationsDepartments),
        )) as typeof initialState.shared.locations;

        const expected = { ...initialState.shared.locations };
        expected.entities = { ...expected.entities };
        expected.entities['1'].children = [
          {
            id: '1',
            name: 'test department',
            lastUpdate: 0,
            children: [],
            isDirty: false,
          },
        ];
        // Perform the assertion
        expect(result).toEqual(expected);
      });
    });
    describe('when locations has a child that points to a department and the department does not exist in the store', () => {
      it('should return location but not departments', async () => {
        if (!store) {
          throw new Error(storeNotDefined);
        }

        // Set the state if necessary
        store.setState({
          shared: {
            ...initialState.shared,
            departments: { ids: [], entities: {} },
            locations: {
              ids: ['1'],
              entities: {
                '1': {
                  id: '1',
                  name: locationName,
                  children: ['1'],
                },
              },
            },
          },
          shared2: initialState.shared2,
        });

        // Get the first emitted value from the selector
        const result = (await firstValueFrom(
          store.select(selectLocationsDepartments),
        )) as typeof initialState.shared.locations;

        const expected = { ...initialState.shared.locations };
        expected.entities = { ...expected.entities };
        expected.entities['1'].children = [
          {
            id: '',
            name: 'departments',
            lastUpdate: 0,
            children: [],
          },
        ];
        // Perform the assertion
        expect(result).toEqual(expected);
      });
    });
  });
  describe('selectCurrentLocation', () => {
    const initialState = {
      shared: {
        departments: {
          ids: [],
          entities: {},
        },
        locations: {
          ids: [],
          entities: {},
        },
        departmentChildren: {
          ids: [],
          entities: {},
        },
      },
      shared2: {
        currentLocation: '',
      },
    };

    describe('when currentLocation is empty and locations is empty', () => {
      it('should return a blank location', async () => {
        if (!store) {
          throw new Error(storeNotDefined);
        }
        store.setState({
          shared: initialState.shared,
          shared2: initialState.shared2,
        });

        const result = (await firstValueFrom(
          store.select(selectCurrentLocation),
        )) as Location;

        expect(result).toEqual({
          id: '',
          name: '',
          children: [],
          isDirty: false,
        });
      });
    });
    describe('when currentLocation is empty and locations has an element', () => {
      it('should return a blank location', async () => {
        if (!store) {
          throw new Error(storeNotDefined);
        }
        store.setState({
          shared: {
            ...initialState.shared,
            locations: {
              ids: ['1'],
              entities: {
                '1': {
                  id: '1',
                  name: 'location testb',
                  children: [],
                } as Location,
              },
            },
          },
          shared2: initialState.shared2,
        });

        const result = (await firstValueFrom(
          store.select(selectCurrentLocation),
        )) as Location;

        expect(result).toEqual({
          id: '1',
          name: 'location testb',
          children: [],
        });
      });
    });
    describe('when currentLocation is "1" and locations has a "1" element', () => {
      it('should return the "1" location', async () => {
        if (!store) {
          throw new Error(storeNotDefined);
        }
        store.setState({
          shared: {
            ...initialState.shared,
            locations: {
              ids: ['1'],
              entities: {
                '1': {
                  id: '1',
                  name: 'location testc',
                  children: [],
                } as Location,
              },
            },
          },
          shared2: {
            currentLocation: '1',
          },
        });

        const result = (await firstValueFrom(
          store.select(selectCurrentLocation),
        )) as Location;

        expect(result).toEqual({
          id: '1',
          name: 'location testc',
          children: [],
        });
      });
    });
  });
});
