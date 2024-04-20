import { createEntityAdapter } from '@ngrx/entity';
import { DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { firstValueFrom, take } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { entityDefinitionCache } from '@smart/smart-ngrx/registrations/entity-definition-cache.function';
import {
  registerEntity,
  unregisterEntity,
} from '@smart/smart-ngrx/registrations/register-entity.function';
import { store } from '@smart/smart-ngrx/selector/store.function';
import { clearState } from '@smart/smart-ngrx/tests/functions/clear-state.function';
import { createStore } from '@smart/smart-ngrx/tests/functions/create-store.function';
import { setState } from '@smart/smart-ngrx/tests/functions/set-state.function';
import { SmartEntityDefinition } from '@smart/smart-ngrx/types/smart-entity-definition.interface';
import { SmartNgRXRowBase } from '@smart/smart-ngrx/types/smart-ngrx-row-base.interface';

import { LocationEntity } from '../../shared/entities';
import { Location } from '../../shared/locations/location.interface';

const locationName = 'test location';

describe('fake test to make jest happy', () => {
  it('should pass', () => {
    expect(true).toBe(true);
  });
});

// eslint-disable-next-line jest/no-export -- not really a spec but needs to look like a spec because it is a spec factory
export function locationSelectorTestFactory(
  featureKey: string,
  featureKey2: string,
  selectors: {
    selectLocations: MemoizedSelector<
      object,
      Location[],
      (_: LocationEntity) => Location[]
    >;
    selectLocationsDepartments: MemoizedSelector<
      object,
      LocationEntity,
      DefaultProjectorFn<LocationEntity>
    >;
    selectCurrentLocation: MemoizedSelector<
      object,
      Location,
      (s1: LocationEntity, s2: number | string) => Location
    >;
  },
): void {
  describe('Location Selectors', () => {
    beforeEach(() => {
      createStore();

      registerEntity(featureKey, 'location', {
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
      registerEntity(featureKey, 'departments', {
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
      registerEntity(featureKey, 'departmentChildren', {
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
      entityDefinitionCache(featureKey, 'departmentChildren', {
        entityAdapter: createEntityAdapter(),
      } as SmartEntityDefinition<SmartNgRXRowBase>);
      entityDefinitionCache(featureKey, 'departments', {
        entityAdapter: createEntityAdapter(),
      } as SmartEntityDefinition<SmartNgRXRowBase>);
      entityDefinitionCache(featureKey, 'locations', {
        entityAdapter: createEntityAdapter(),
      } as SmartEntityDefinition<SmartNgRXRowBase>);
    });
    afterEach(() => {
      unregisterEntity(featureKey, 'location');
      unregisterEntity(featureKey, 'departments');
      unregisterEntity(featureKey, 'departmentChildren');
      clearState();
    });
    describe('selectLocation', () => {
      beforeEach(() => {
        setState(featureKey, 'departments', { ids: [], entities: {} });
        setState(featureKey, 'locations', { ids: [], entities: {} });
        setState(featureKey, 'departmentChildren', { ids: [], entities: {} });
        setState(featureKey2, 'currentLocation', '');
      });
      describe('if no items are loaded for locations', () => {
        it('should select locations and trigger load action if empty', async () => {
          const result = await firstValueFrom(
            store().select(selectors.selectLocations),
          );

          expect(result).toEqual([]);
        });
        it('should select locations and not trigger load action if not empty even if currentLocation is empty', async () => {
          const result = await firstValueFrom(
            store().select(selectors.selectLocations),
          );

          expect(result).toEqual([]);
        });
      });
      describe('if we have at least one row loaded in locations', () => {
        let testScheduler: TestScheduler;
        beforeEach(() => {
          setState(featureKey, 'locations', {
            ids: ['1'],
            entities: {
              '1': {
                id: '1',
                name: 'test',
                departments: [],
              },
            },
          });
          setState(featureKey2, 'currentLocation', '1');
        });

        beforeEach(() => {
          testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
          });
        });

        it('should select locations and not trigger load action if empty', async () => {
          await testScheduler.run(async ({ expectObservable }) => {
            // eslint-disable-next-line rxjs/no-unsafe-first -- needed for this test
            const action = (store() as MockStore).scannedActions$.pipe(take(1));

            const result = await firstValueFrom(
              store().select(selectors.selectLocations),
            );

            expect(result).toEqual([
              { id: '1', name: 'test', departments: [] },
            ]);

            expectObservable(action).toBe('');
          });
        });
        it('should select locations and not trigger load action if not empty even if currentLocation is empty', async () => {
          await testScheduler.run(async ({ expectObservable }) => {
            setState(featureKey2, 'currentLocation', '');
            setState(featureKey, 'locations', { ids: [], entities: {} });
            // eslint-disable-next-line rxjs/no-unsafe-first -- need for this test
            const action = (store() as MockStore).scannedActions$.pipe(take(1));

            const result = await firstValueFrom(
              store().select(selectors.selectLocations),
            );

            expect(result).toEqual([]);

            expectObservable(action).toBe('');
          });
        });
      });
    });
    describe('selectors.selectLocationsDepartments', () => {
      beforeEach(() => {
        setState(featureKey, 'departments', {
          ids: ['1'],
          entities: {
            '1': {
              id: '1',
              name: 'test department',
              children: [],
              isDirty: false,
            },
          },
        });
        setState(featureKey, 'locations', {
          ids: ['1'],
          entities: {
            '1': { id: '1', name: 'location name', departments: [] },
          },
        });
        setState(featureKey, 'departmentChildren', { ids: [], entities: {} });
        setState(featureKey2, 'currentLocation', '');
      });
      afterEach(() => {
        clearState();
      });

      describe('when locations has no children', () => {
        it('should return location but not departments', async () => {
          // Get the first emitted value from the selector
          const result = await firstValueFrom(
            store().select(selectors.selectLocationsDepartments),
          );

          // Perform the assertion
          // we have to stringify because the ArrayProxy is not an Array and the comparison
          // sees the left and right has side as different.
          // using stringify uses toJSON() on the ArrayProxy
          expect(JSON.parse(JSON.stringify(result.entities))).toEqual({
            '1': { id: '1', name: 'location name', departments: [] },
          });
        });
      });
      describe('when locations has a child that points to a department and the department exist in the store', () => {
        it('should return location and departments', async () => {
          setState(featureKey, 'locations', {
            ids: ['1'],
            entities: {
              '1': {
                id: '1',
                name: locationName,
                departments: ['1'],
              },
            },
          });

          // Get the first emitted value from the selector
          const result = await firstValueFrom(
            store().select(selectors.selectLocationsDepartments),
          );

          const expected = {
            ids: ['1'],
            entities: {
              '1': {
                id: '1',
                name: locationName,
                departments: [
                  {
                    id: '1',
                    name: 'test department',
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
          setState(featureKey, 'departments', { ids: [], entities: {} });
          setState(featureKey, 'locations', {
            ids: ['1'],
            entities: {
              '1': {
                id: '1',
                name: locationName,
                departments: ['1'],
              },
            },
          });

          // Get the first emitted value from the selector
          const result = await firstValueFrom(
            store().select(selectors.selectLocationsDepartments),
          );

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
    describe('selectors.selectCurrentLocation', () => {
      beforeEach(() => {
        setState(featureKey, 'departments', { ids: [], entities: {} });
        setState(featureKey, 'locations', { ids: [], entities: {} });
        setState(featureKey, 'departmentChildren', { ids: [], entities: {} });
        setState(featureKey2, 'currentLocation', '');
      });
      describe('when currentLocation is empty and locations is empty', () => {
        it('should return a blank location', async () => {
          const result = await firstValueFrom(
            store().select(selectors.selectCurrentLocation),
          );

          expect(JSON.parse(JSON.stringify(result))).toEqual({
            id: '',
            name: '',
            isDirty: false,
            departments: [],
          });
        });
      });
      describe('when currentLocation is empty and locations has an element', () => {
        it('should return a blank location', async () => {
          setState(featureKey, 'locations', {
            ids: ['1'],
            entities: {
              '1': {
                id: '1',
                name: 'location testb',
                departments: [],
              } as Location,
            },
          });

          const result = await firstValueFrom(
            store().select(selectors.selectCurrentLocation),
          );

          expect(JSON.parse(JSON.stringify(result))).toEqual({
            id: '1',
            name: 'location testb',
            departments: [],
          });
        });
      });
      describe('when currentLocation is "1" and locations has a "1" element', () => {
        it('should return the "1" location', async () => {
          setState(featureKey, 'locations', {
            ids: ['1'],
            entities: {
              '1': {
                id: '1',
                name: 'location testc',
                departments: [],
              } as Location,
            },
          });
          setState(featureKey2, 'currentLocation', '1');

          const result = await firstValueFrom(
            store().select(selectors.selectCurrentLocation),
          );

          expect(JSON.parse(JSON.stringify(result))).toEqual({
            id: '1',
            name: 'location testc',
            departments: [],
          });
        });
      });
      describe('when currentLocationId is not in location.entities', () => {
        beforeEach(() => {
          setState(featureKey2, 'currentLocation', '2');
        });
        it('should return blank location', async () => {
          const result = await firstValueFrom(
            store().select(selectors.selectCurrentLocation),
          );

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
}
