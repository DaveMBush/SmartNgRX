import { TestBed } from '@angular/core/testing';
import { createEntityAdapter } from '@ngrx/entity';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { firstValueFrom, take } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { castTo } from '@smart/smart-ngrx/common/cast-to.function';
import { adapterForEntity } from '@smart/smart-ngrx/functions/adapter-for-entity.function';
import {
  registerEntity,
  unregisterEntity,
} from '@smart/smart-ngrx/functions/register-entity.function';
import { store as storeFunction } from '@smart/smart-ngrx/selector/store.function';

import { Department } from '../../../../shared/department/department.interface';
import { LocationEntity } from '../../../../shared/entities';
import { Location } from '../../../../shared/locations/location.interface';
import {
  TreeNoDirtyState,
  TreeNoDirtyState2,
} from '../tree-no-dirty-state.interface';
import {
  selectCurrentLocation,
  selectLocations,
  selectLocationsDepartments,
} from './location.selectors';

const storeNotDefined = 'store not defined';

const locationName = 'test location';

const treeNoDirtyFeatureKey = 'tree-no-dirty';
const treeNoDirtyFeatureKey2 = 'tree-no-dirty2';

describe('Location Selectors', () => {
  let store:
    | MockStore<{
        [treeNoDirtyFeatureKey]: TreeNoDirtyState;
        [treeNoDirtyFeatureKey2]: TreeNoDirtyState2;
      }>
    | undefined;
  let initialState: {
    [treeNoDirtyFeatureKey]: {
      locations: TreeNoDirtyState['locations'];
      departments: TreeNoDirtyState['departments'];
      departmentChildren: TreeNoDirtyState['departmentChildren'];
    };
    [treeNoDirtyFeatureKey2]: TreeNoDirtyState2;
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
    });
    store = TestBed.inject(MockStore);
    storeFunction(store);

    registerEntity(treeNoDirtyFeatureKey, 'location', {
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
    registerEntity(treeNoDirtyFeatureKey, 'departments', {
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
    registerEntity(treeNoDirtyFeatureKey, 'departmentChildren', {
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
    unregisterEntity(treeNoDirtyFeatureKey, 'location');
    unregisterEntity(treeNoDirtyFeatureKey, 'departments');
    unregisterEntity(treeNoDirtyFeatureKey, 'departmentChildren');
  });
  describe('selectLocation', () => {
    beforeEach(() => {
      initialState = {
        [treeNoDirtyFeatureKey]: {
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
        [treeNoDirtyFeatureKey2]: {
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
          [treeNoDirtyFeatureKey]: initialState[treeNoDirtyFeatureKey],
          [treeNoDirtyFeatureKey2]: initialState[treeNoDirtyFeatureKey2],
        });
        const result = (await firstValueFrom(
          store.select(selectLocations),
        )) as LocationEntity;

        expect(result).toEqual(
          initialState[treeNoDirtyFeatureKey].locations.ids,
        );
      });
      it('should select locations and not trigger load action if not empty even if currentLocation is empty', async () => {
        if (!store) {
          throw new Error(storeNotDefined);
        }
        store.setState({
          [treeNoDirtyFeatureKey]: {
            ...initialState[treeNoDirtyFeatureKey],
          },
          [treeNoDirtyFeatureKey2]: { currentLocation: '' },
        });

        const result = (await firstValueFrom(
          store.select(selectLocations),
        )) as LocationEntity;

        expect(result).toEqual(
          initialState[treeNoDirtyFeatureKey].locations.ids,
        );
      });
    });
    describe('if we have at least one row loaded in locations', () => {
      let testScheduler: TestScheduler;
      beforeEach(() => {
        initialState[treeNoDirtyFeatureKey].locations = {
          ids: ['1'],
          entities: {
            '1': {
              id: '1',
              name: 'test',
              departments: [],
            },
          },
        };
        initialState[treeNoDirtyFeatureKey2].currentLocation = '1';
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
            [treeNoDirtyFeatureKey]: initialState[treeNoDirtyFeatureKey],
            [treeNoDirtyFeatureKey2]: initialState[treeNoDirtyFeatureKey2],
          });
          // eslint-disable-next-line rxjs/no-unsafe-first -- need for this test
          const action = store.scannedActions$.pipe(take(1));

          const result = (await firstValueFrom(
            store.select(selectLocations),
          )) as LocationEntity;

          const expected = initialState[
            treeNoDirtyFeatureKey
          ].locations.ids.map((id) => ({
            ...castTo<Record<string, Location>>(
              initialState[treeNoDirtyFeatureKey].locations.entities,
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
            [treeNoDirtyFeatureKey]: {
              ...initialState[treeNoDirtyFeatureKey],
            },
            [treeNoDirtyFeatureKey2]: { currentLocation: '' },
          });
          // eslint-disable-next-line rxjs/no-unsafe-first -- need for this test
          const action = store.scannedActions$.pipe(take(1));

          const result = (await firstValueFrom(
            store.select(selectLocations),
          )) as LocationEntity;

          const expected = initialState[
            treeNoDirtyFeatureKey
          ].locations.ids.map((id) => ({
            ...castTo<Record<string, Location>>(
              initialState[treeNoDirtyFeatureKey].locations.entities,
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
      [treeNoDirtyFeatureKey]: {
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
      [treeNoDirtyFeatureKey2]: {
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
          [treeNoDirtyFeatureKey]: castTo<TreeNoDirtyState>(
            initialState[treeNoDirtyFeatureKey],
          ),
          [treeNoDirtyFeatureKey2]: initialState[treeNoDirtyFeatureKey2],
        });

        adapterForEntity(
          treeNoDirtyFeatureKey,
          'departments',
          createEntityAdapter(),
        );

        // Get the first emitted value from the selector
        const result = (await firstValueFrom(
          store.select(selectLocationsDepartments),
        )) as LocationEntity;

        // Perform the assertion
        // we have to stringify because the ArrayProxy is not an Array and the comparison
        // sees the left and right has side as different.
        // using stringify uses toJSON() on the ArrayProxy
        expect(JSON.parse(JSON.stringify(result.entities))).toEqual(
          initialState[treeNoDirtyFeatureKey].locations.entities,
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
          [treeNoDirtyFeatureKey]: {
            ...initialState[treeNoDirtyFeatureKey],
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
          [treeNoDirtyFeatureKey2]: initialState[treeNoDirtyFeatureKey2],
        });

        adapterForEntity(
          treeNoDirtyFeatureKey,
          'departments',
          createEntityAdapter(),
        );

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
          [treeNoDirtyFeatureKey]: {
            ...initialState[treeNoDirtyFeatureKey],
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
          [treeNoDirtyFeatureKey2]: initialState[treeNoDirtyFeatureKey2],
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
      [treeNoDirtyFeatureKey]: {
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
      [treeNoDirtyFeatureKey2]: {
        currentLocation: '',
      },
    };

    describe('when currentLocation is empty and locations is empty', () => {
      it('should return a blank location', async () => {
        if (!store) {
          throw new Error(storeNotDefined);
        }
        store.setState({
          [treeNoDirtyFeatureKey]: initialState[treeNoDirtyFeatureKey],
          [treeNoDirtyFeatureKey2]: initialState[treeNoDirtyFeatureKey2],
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
          [treeNoDirtyFeatureKey]: {
            ...initialState[treeNoDirtyFeatureKey],
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
          [treeNoDirtyFeatureKey2]: initialState[treeNoDirtyFeatureKey2],
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
          [treeNoDirtyFeatureKey]: {
            ...initialState[treeNoDirtyFeatureKey],
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
          [treeNoDirtyFeatureKey2]: {
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
        initialState[treeNoDirtyFeatureKey2].currentLocation = '2';
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
