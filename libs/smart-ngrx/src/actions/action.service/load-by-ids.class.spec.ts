import { InjectionToken } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { entityRowsRegistry } from '../../mark-and-delete/entity-rows-registry.class';
import { entityDefinitionRegistry } from '../../registrations/entity-definition-registry.function';
import { entityRegistry } from '../../registrations/entity-registry.class';
import { featureRegistry } from '../../registrations/feature-registry.class';
import { serviceRegistry } from '../../registrations/service-registry.class';
import { createStore } from '../../tests/functions/create-store.function';
import { ActionGroup } from '../../types/action-group.interface';
import { EffectService } from '../../types/effect-service';
import { PartialArrayDefinition } from '../../types/partial-array-definition.interface';
import { SmartNgRXRowBase } from '../../types/smart-ngrx-row-base.interface';
import { actionFactory } from './action.factory';
import { LoadByIds } from './load-by-ids.class';

interface SomeDataRow extends SmartNgRXRowBase {
  someData: string;
}

class MockEffectService extends EffectService<SmartNgRXRowBase> {
  override loadByIndexes(
    parentId: string,
    childField: string,
    startIndex: number,
    length: number,
  ): Observable<PartialArrayDefinition> {
    return of({
      startIndex,
      indexes: [],
      length,
    });
  }

  override loadByIds(_: string[]): Observable<SmartNgRXRowBase[]> {
    return of([]);
  }

  override update(newRow: SmartNgRXRowBase): Observable<SmartNgRXRowBase[]> {
    return of([newRow]);
  }

  override add(row: SmartNgRXRowBase): Observable<SmartNgRXRowBase[]> {
    return of([row]);
  }

  override delete(_: string): Observable<void> {
    return of(undefined);
  }
}

// Mock types
type MockStore = Partial<Store>;

describe('LoadByIds', () => {
  let effectServiceLoadByIdSpy: jest.SpyInstance;

  const effectServiceToken = new InjectionToken<
    EffectService<SmartNgRXRowBase>
  >('testEffectService');
  let loadByIds: LoadByIds;
  let mockStore: MockStore;
  let actions: ActionGroup<SomeDataRow>;
  let mockEntities: BehaviorSubject<Record<string, SomeDataRow>>;
  const effectService = new MockEffectService();

  beforeEach(() => {
    createStore();
    entityRegistry.register('testFeature', 'testEntity', {
      defaultRow: (id: string) => ({ id }) as SmartNgRXRowBase,
      markAndDeleteInit: {
        markDirtyTime: 15 * 60000,
        markDirtyFetchesNew: true,
        removeTime: 30 * 60000,
        runInterval: 60000,
      },
      markAndDeleteEntityMap: new Map(),
    });
    featureRegistry.registerFeature('testFeature');
    entityDefinitionRegistry('testFeature', 'testEntity', {
      entityName: 'testEntity',
      effectServiceToken,
      defaultRow: (id: string) => ({ id }) as SmartNgRXRowBase,
    });
    serviceRegistry.register(effectServiceToken, effectService);

    mockStore = {
      dispatch: jest.fn(),
    };
    jest
      .spyOn(entityRowsRegistry, 'register')
      .mockImplementation((_, __, rows) => rows);
    jest.spyOn(mockStore, 'dispatch');
    actions = actionFactory<SomeDataRow>('testFeature', 'testEntity');
    mockEntities = new BehaviorSubject<Record<string, SomeDataRow>>({});
    actions = actionFactory<SomeDataRow>('testFeature', 'testEntity');
    effectServiceLoadByIdSpy = jest
      .spyOn(effectService, 'loadByIds')
      .mockImplementation((ids) => {
        return of(ids.map((id) => ({ id, someData: id }) as SomeDataRow));
      });

    loadByIds = new LoadByIds('testFeature', 'testEntity', mockStore as Store);
    loadByIds.init(
      actions as unknown as ActionGroup,
      mockEntities.asObservable(),
      (id: string) => ({ id, isLoading: false }) as SmartNgRXRowBase,
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
    entityRegistry.unregister('testFeature', 'testEntity');
  });

  describe('loadByIds', () => {
    it('should filter out preload ids and dispatch loadByIds action', fakeAsync(() => {
      const ids = ['1', 'index-2', '3', 'indexNoOp-4', '5'];
      const existingEntities: Record<string, SomeDataRow> = {
        '1': { id: '1', someData: 'test1', isLoading: true },
        '3': { id: '3', someData: 'test3', isLoading: false },
        '5': { id: '5', someData: 'test5', isLoading: false },
      };

      mockEntities.next(existingEntities);

      ids.forEach((id) => {
        loadByIds.loadByIds(id);
      });

      tick(300);
      tick();
      expect(effectServiceLoadByIdSpy).toHaveBeenCalled();
      expect(effectServiceLoadByIdSpy).toHaveBeenCalledWith(['3', '5']);
    }));

    it('should not dispatch action if all ids are filtered out', fakeAsync(() => {
      const ids = ['index-1', 'indexNoOp-2'];
      const existingEntities: Record<string, SomeDataRow> = {};

      jest.spyOn(mockStore, 'dispatch');

      mockEntities.next(existingEntities);

      ids.forEach((id) => {
        loadByIds.loadByIds(id);
        tick(0);
      });

      tick(300);
      tick();

      expect(effectServiceLoadByIdSpy).not.toHaveBeenCalled();
    }));
  });

  describe('loadByIdsPreload', () => {
    it('should dispatch storeRows action with default rows', fakeAsync(() => {
      const ids = ['1', '2'];
      const existingEntities: Record<string, SomeDataRow> = {
        '1': { id: '1', someData: 'test', isLoading: false },
      };

      jest.spyOn(mockStore, 'dispatch');

      mockEntities = new BehaviorSubject<Record<string, SomeDataRow>>(
        existingEntities,
      );

      loadByIds.init(
        actions as unknown as ActionGroup,
        mockEntities.asObservable(),
        (id: string) =>
          ({ id, someData: 'test', isLoading: false }) as SomeDataRow,
      );
      loadByIds.loadByIdsPreload(ids);
      tick();

      expect(mockStore.dispatch).toHaveBeenCalledWith(
        actions.storeRows({
          rows: [{ id: '2', someData: 'test', isLoading: true }],
        }),
      );
    }));
  });

  describe('loadByIdsSuccess', () => {
    it('should dispatch storeRows action with registered rows', fakeAsync(() => {
      const rows: SomeDataRow[] = [
        { id: '1', someData: 'test1', isLoading: false },
        { id: '2', someData: 'test2', isLoading: false },
      ];
      const existingEntities: Record<string, SomeDataRow> = {
        '1': { id: '1', someData: 'existing', isLoading: false },
      };

      jest.spyOn(mockStore, 'dispatch');

      mockEntities.next(existingEntities);

      loadByIds.loadByIdsSuccess(rows);

      tick();

      expect(mockStore.dispatch).toHaveBeenCalledWith(
        actions.storeRows({
          rows: [
            { id: '1', someData: 'test1', isLoading: false },
            { id: '2', someData: 'test2', isLoading: false },
          ],
        }),
      );
    }));
  });
});
