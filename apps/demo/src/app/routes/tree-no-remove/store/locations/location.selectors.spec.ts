import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { firstValueFrom, take } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { castTo } from '@smart/smart-ngrx/common/cast-to.function';
import {
  registerEntity,
  unregisterEntity,
} from '@smart/smart-ngrx/functions/register-entity.function';
import { store as storeFunction } from '@smart/smart-ngrx/selector/store.function';

import { Department } from '../../../../shared/department/department.interface';
import { Location } from '../../../../shared/locations/location.interface';
import { LocationEntity } from '../entities';
import {
  TreeNoRemoveState,
  TreeNoRemoveState2,
} from '../tree-no-remove-state.interface';
import {
  selectCurrentLocation,
  selectLocations,
  selectLocationsDepartments,
} from './location.selectors';

const storeNotDefined = 'store not defined';

const locationName = 'test location';

const treeNoRemoveFeatureKey = 'tree-no-remove';
const treeNoRemoveFeatureKey2 = 'tree-no-remove2';

describe('Location Selectors', () => {
  let store:
    | MockStore<{
        [treeNoRemoveFeatureKey]: TreeNoRemoveState;
        [treeNoRemoveFeatureKey2]: TreeNoRemoveState2;
      }>
    | undefined;
  let initialState: {
    [treeNoRemoveFeatureKey]: {
      locations: TreeNoRemoveState['locations'];
      departments: TreeNoRemoveState['departments'];
      departmentChildren: TreeNoRemoveState['departmentChildren'];
    };
    [treeNoRemoveFeatureKey2]: TreeNoRemoveState2;
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
    });
    store = TestBed.inject(MockStore);
    storeFunction(store);

    registerEntity(treeNoRemoveFeatureKey, 'location', {
      markAndDeleteInit: {
        runInterval: 1000,
        markDirtyTime: 15 * 60 * 1000,
        removeTime: 30 * 60 * 1000,
        markDirtyFetchesNew: true,
      },
      markAndDeleteEntityMap: new Map(),
      defaultRow: (id: string) => ({
        isDirty: false,
        id,
        name: '',
        children: [],
      }),
    });
    registerEntity(treeNoRemoveFeatureKey, 'departments', {
      markAndDeleteInit: {
        runInterval: 1000,
        markDirtyTime: 15 * 60 * 1000,
        removeTime: 30 * 60 * 1000,
        markDirtyFetchesNew: true,
      },
      markAndDeleteEntityMap: new Map(),
      defaultRow: (id: string) => ({
        isDirty: false,
        id,
        name: '',
        children: [],
      }),
    });
    registerEntity(treeNoRemoveFeatureKey, 'departmentChildren', {
      markAndDeleteInit: {
        runInterval: 1000,
        markDirtyTime: 15 * 60 * 1000,
        removeTime: 30 * 60 * 1000,
        markDirtyFetchesNew: true,
      },
      markAndDeleteEntityMap: new Map(),
      defaultRow: (id: string) => ({
        isDirty: false,
        id,
        name: '',
        children: [],
      }),
    });
  });
  afterEach(() => {
    unregisterEntity(treeNoRemoveFeatureKey, 'location');
    unregisterEntity(treeNoRemoveFeatureKey, 'departments');
    unregisterEntity(treeNoRemoveFeatureKey, 'departmentChildren');
  });
  describe('selectLocation', () => {
    beforeEach(() => {
      initialState = {
        [treeNoRemoveFeatureKey]: {
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
        [treeNoRemoveFeatureKey2]: {
          currentLocation: '',
        },
      };
    });
    describe('if no items are loaded for locations', () => {
      it('should select locations and trigger load action if empty', async () => {
        if (!store) {
          throw new Error(storeNotDefined);
        }
        store.setState({
          [treeNoRemoveFeatureKey]: initialState[treeNoRemoveFeatureKey],
          [treeNoRemoveFeatureKey2]: initialState[treeNoRemoveFeatureKey2],
        });
        const result = (await firstValueFrom(
          store.select(selectLocations),
        )) as LocationEntity;

        expect(result).toEqual(
          initialState[treeNoRemoveFeatureKey].locations.ids,
        );
      });
      it('should select locations and not trigger load action if not empty even if currentLocation is empty', async () => {
        if (!store) {
          throw new Error(storeNotDefined);
        }
        store.setState({
          [treeNoRemoveFeatureKey]: {
            ...initialState[treeNoRemoveFeatureKey],
          },
          [treeNoRemoveFeatureKey2]: { currentLocation: '' },
        });

        const result = (await firstValueFrom(
          store.select(selectLocations),
        )) as LocationEntity;

        expect(result).toEqual(
          initialState[treeNoRemoveFeatureKey].locations.ids,
        );
      });
    });
    describe('if we have at least one row loaded in locations', () => {
      let testScheduler: TestScheduler;
      beforeEach(() => {
        initialState[treeNoRemoveFeatureKey].locations = {
          ids: ['1'],
          entities: {
            '1': {
              id: '1',
              name: 'test',
              departments: [],
            },
          },
        };
        initialState[treeNoRemoveFeatureKey2].currentLocation = '1';
      });

      beforeEach(() => {
        testScheduler = new TestScheduler((actual, expected) => {
          expect(actual).toEqual(expected);
        });
      });

      it('should select locations and not trigger load action if empty', async () => {
        await testScheduler.run(async ({ expectObservable }) => {
          if (!store) {
            throw new Error(storeNotDefined);
          }
          store.setState({
            [treeNoRemoveFeatureKey]: initialState[treeNoRemoveFeatureKey],
            [treeNoRemoveFeatureKey2]: initialState[treeNoRemoveFeatureKey2],
          });
          // eslint-disable-next-line rxjs/no-unsafe-first -- need for this test
          const action = store.scannedActions$.pipe(take(1));

          const result = (await firstValueFrom(
            store.select(selectLocations),
          )) as LocationEntity;

          const expected = initialState[
            treeNoRemoveFeatureKey
          ].locations.ids.map((id) => ({
            ...castTo<Record<string, Location>>(
              initialState[treeNoRemoveFeatureKey].locations.entities,
            )[id],
            departments: [],
          }));
          expect(result).toEqual(expected);

          expectObservable(action).toBe('');
        });
      });
      it('should select locations and not trigger load action if not empty even if currentLocation is empty', async () => {
        await testScheduler.run(async ({ expectObservable }) => {
          if (!store) {
            throw new Error(storeNotDefined);
          }
          store.setState({
            [treeNoRemoveFeatureKey]: {
              ...initialState[treeNoRemoveFeatureKey],
            },
            [treeNoRemoveFeatureKey2]: { currentLocation: '' },
          });
          // eslint-disable-next-line rxjs/no-unsafe-first -- need for this test
          const action = store.scannedActions$.pipe(take(1));

          const result = (await firstValueFrom(
            store.select(selectLocations),
          )) as LocationEntity;

          const expected = initialState[
            treeNoRemoveFeatureKey
          ].locations.ids.map((id) => ({
            ...castTo<Record<string, Location>>(
              initialState[treeNoRemoveFeatureKey].locations.entities,
            )[id],
            departments: [],
          }));

          expect(result).toEqual(expected);

          expectObservable(action).toBe('');
        });
      });
    });
  });
  describe('selectLocationsDepartments', () => {
    initialState = {
      [treeNoRemoveFeatureKey]: {
        departments: {
          ids: ['1'],
          entities: {
            '1': {
              id: '1',
              name: 'test department',
              children: [],
              isDirty: false,
            } as Department,
          },
        },
        locations: {
          ids: ['1'],
          entities: {
            '1': {
              id: '1',
              name: locationName,
              departments: [] as Department[] | string[],
            },
          },
        },
        departmentChildren: {
          ids: [],
          entities: {},
        },
      },
      [treeNoRemoveFeatureKey2]: {
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
          [treeNoRemoveFeatureKey]: castTo<TreeNoRemoveState>(
            initialState[treeNoRemoveFeatureKey],
          ),
          [treeNoRemoveFeatureKey2]: initialState[treeNoRemoveFeatureKey2],
        });

        // Get the first emitted value from the selector
        const result = (await firstValueFrom(
          store.select(selectLocationsDepartments),
        )) as LocationEntity;

        // Perform the assertion
        // we have to stringify because the ArrayProxy is not an Array and the comparison
        // sees the left and right has side as different.
        // using stringify uses toJSON() on the ArrayProxy
        expect(JSON.parse(JSON.stringify(result.entities))).toEqual(
          initialState[treeNoRemoveFeatureKey].locations.entities,
        );
      });
    });
    describe('when locations has a child that points to a department and the department exist in the store', () => {
      it('should return location and departments', async () => {
        if (!store) {
          throw new Error(storeNotDefined);
        }

        // Set the state if necessary
        store.setState({
          [treeNoRemoveFeatureKey]: {
            ...initialState[treeNoRemoveFeatureKey],
            locations: {
              ids: ['1'],
              entities: {
                '1': {
                  id: '1',
                  name: locationName,
                  departments: ['1'],
                },
              },
            },
          },
          [treeNoRemoveFeatureKey2]: initialState[treeNoRemoveFeatureKey2],
        });

        // Get the first emitted value from the selector
        const result = (await firstValueFrom(
          store.select(selectLocationsDepartments),
        )) as LocationEntity;

        const expected = {
          ids: ['1'],
          entities: {
            '1': {
              id: '1',
              name: locationName,
              departments: [
                {
                  id: '1',
                  name: '',
                  children: [] as string[],
                  isDirty: false,
                },
              ],
            },
          },
        };
        // Perform the assertion
        expect(JSON.parse(JSON.stringify(result))).toEqual(expected);
      });
    });
    describe('when locations has a child that points to a department and the department does not exist in the store', () => {
      it('should return location but not departments', async () => {
        if (!store) {
          throw new Error(storeNotDefined);
        }

        // Set the state if necessary
        store.setState({
          [treeNoRemoveFeatureKey]: {
            ...initialState[treeNoRemoveFeatureKey],
            departments: { ids: [], entities: {} },
            locations: {
              ids: ['1'],
              entities: {
                '1': {
                  id: '1',
                  name: locationName,
                  departments: ['1'],
                },
              },
            },
          },
          [treeNoRemoveFeatureKey2]: initialState[treeNoRemoveFeatureKey2],
        });

        // Get the first emitted value from the selector
        const result = (await firstValueFrom(
          store.select(selectLocationsDepartments),
        )) as LocationEntity;

        const expected = {
          ids: ['1'],
          entities: {
            '1': {
              id: '1',
              name: locationName,
              departments: [
                {
                  id: '1',
                  name: '',
                  isDirty: false,
                  children: [],
                },
              ],
            },
          },
        };
        // Perform the assertion
        expect(JSON.parse(JSON.stringify(result))).toEqual(expected);
      });
    });
  });
  describe('selectCurrentLocation', () => {
    initialState = {
      [treeNoRemoveFeatureKey]: {
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
      [treeNoRemoveFeatureKey2]: {
        currentLocation: '',
      },
    };

    describe('when currentLocation is empty and locations is empty', () => {
      it('should return a blank location', async () => {
        if (!store) {
          throw new Error(storeNotDefined);
        }
        store.setState({
          [treeNoRemoveFeatureKey]: initialState[treeNoRemoveFeatureKey],
          [treeNoRemoveFeatureKey2]: initialState[treeNoRemoveFeatureKey2],
        });

        const result = (await firstValueFrom(
          store.select(selectCurrentLocation),
        )) as Location;

        expect(JSON.parse(JSON.stringify(result))).toEqual({
          id: '1',
          name: 'test',
          departments: [],
        });
      });
    });
    describe('when currentLocation is empty and locations has an element', () => {
      it('should return a blank location', async () => {
        if (!store) {
          throw new Error(storeNotDefined);
        }
        store.setState({
          [treeNoRemoveFeatureKey]: {
            ...initialState[treeNoRemoveFeatureKey],
            locations: {
              ids: ['1'],
              entities: {
                '1': {
                  id: '1',
                  name: 'location testb',
                  departments: [],
                } as Location,
              },
            },
          },
          [treeNoRemoveFeatureKey2]: initialState[treeNoRemoveFeatureKey2],
        });

        const result = (await firstValueFrom(
          store.select(selectCurrentLocation),
        )) as Location;

        expect(JSON.parse(JSON.stringify(result))).toEqual({
          id: '1',
          name: 'location testb',
          departments: [],
        });
      });
    });
    describe('when currentLocation is "1" and locations has a "1" element', () => {
      it('should return the "1" location', async () => {
        if (!store) {
          throw new Error(storeNotDefined);
        }
        store.setState({
          [treeNoRemoveFeatureKey]: {
            ...initialState[treeNoRemoveFeatureKey],
            locations: {
              ids: ['1'],
              entities: {
                '1': {
                  id: '1',
                  name: 'location testc',
                  departments: [],
                } as Location,
              },
            },
          },
          [treeNoRemoveFeatureKey2]: {
            currentLocation: '1',
          },
        });

        const result = (await firstValueFrom(
          store.select(selectCurrentLocation),
        )) as Location;

        expect(JSON.parse(JSON.stringify(result))).toEqual({
          id: '1',
          name: 'location testc',
          departments: [],
        });
      });
    });
    describe('when currentLocationId is not in location.entities', () => {
      beforeEach(() => {
        initialState[treeNoRemoveFeatureKey2].currentLocation = '2';
      });
      it('should return blank location', async () => {
        if (!store) {
          throw new Error(storeNotDefined);
        }
        const result = (await firstValueFrom(
          store.select(selectCurrentLocation),
        )) as Location;

        expect(JSON.parse(JSON.stringify(result))).toEqual({
          id: '',
          name: '',
          isDirty: false,
          departments: [],
        });
      });
    });
  });
});
