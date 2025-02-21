import { EnvironmentInjector, Signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { rootInjector } from '@smarttools/smart-ngrx';

import { LocationEntity } from '../../../../shared/entities/location-entity.type';
import { selectLocationEntities } from '../locations/selectors/select-location-entities.selectors';
import { currentLocationSignalStore } from './current-location.signal-store';

interface CurrentLocationStore {
  currentLocationId: Signal<string>;
  selectCurrentLocationId: Signal<string>;
  setCurrentLocationId(currentLocationId: string): void;
}

describe('CurrentLocationSignalStore', () => {
  let store: MockStore;
  let signalStore: CurrentLocationStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore(), currentLocationSignalStore],
    });
    rootInjector.set(TestBed.inject(EnvironmentInjector));
    store = TestBed.inject(Store) as MockStore;
    signalStore = TestBed.inject(
      currentLocationSignalStore,
    ) as CurrentLocationStore;
  });

  describe('setCurrentLocationId', () => {
    it('should update currentLocationId state', () => {
      const testId = 'test-id';

      signalStore.setCurrentLocationId(testId);

      expect(signalStore.currentLocationId()).toBe(testId);
    });
  });

  describe('selectCurrentLocationId', () => {
    it('should return currentLocationId when it is set', () => {
      const testId = 'test-id';
      store.overrideSelector(selectLocationEntities, {
        ids: [],
        entities: {},
      } as LocationEntity);

      signalStore.setCurrentLocationId(testId);

      expect(signalStore.selectCurrentLocationId()).toBe(testId);
    });

    it('should return first id from locationEntities when currentLocationId is empty', () => {
      const firstId = 'first-id';
      store.overrideSelector(selectLocationEntities, {
        ids: [firstId, 'second-id'],
        entities: {},
      } as LocationEntity);

      expect(signalStore.selectCurrentLocationId()).toBe(firstId);
    });

    it('should return empty string when currentLocationId is empty and no entities exist', () => {
      store.overrideSelector(selectLocationEntities, {
        ids: [],
        entities: {},
      } as LocationEntity);

      expect(signalStore.selectCurrentLocationId()).toBe('');
    });
  });
});
