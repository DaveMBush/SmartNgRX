import { InjectionToken } from '@angular/core';
import { fakeAsync, flushMicrotasks, tick } from '@angular/core/testing';
import { Dictionary } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import * as smartToolsCoreModule from '@smarttools/smart-core';
import {
  EffectService,
  entityDefinitionRegistry,
  entityRegistry,
  FacadeBase,
  facadeRegistry,
  featureRegistry,
  PartialArrayDefinition,
  serviceRegistry,
  SmartNgRXRowBase,
  VirtualArrayContents,
} from '@smarttools/smart-core';
import { Observable, of, Subject } from 'rxjs';

import { createStore } from '../tests/functions/create-store.function';
import { ActionGroup } from '../types/action-group.interface';
import { actionFactory } from './action.factory';
import { ClassicNgrxFacade } from './classic-ngrx.facade';
import { LoadByIndexesClassic } from './load-by-indexes-classic.class';

interface LoadByIndexesClassicPublic
  extends Omit<
    LoadByIndexesClassic,
    'loadByIndexesSubject' | 'processLoadByIndexesSuccess'
  > {
  loadByIndexesSubject: Subject<{
    parentId: string;
    childField: string;
    indexes: number[];
  }>;

  processLoadByIndexesSuccess(
    field: VirtualArrayContents,
    array: PartialArrayDefinition,
  ): VirtualArrayContents;
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

describe('LoadByIndexesClassic', () => {
  const effectServiceToken = new InjectionToken<
    EffectService<SmartNgRXRowBase>
  >('testEffectService');
  let loadByIndexes: LoadByIndexesClassicPublic;
  let actionService: Omit<FacadeBase, 'loadByIndexesService'> & {
    loadByIndexesService: LoadByIndexesClassic;
  };
  let mockStore: Partial<Store>;
  let actions: ActionGroup;
  let mockEntities: Observable<Dictionary<SmartNgRXRowBase>>;
  let mockStoreDispatchSpy: jest.SpyInstance;
  let effectServiceLoadByIndexesClassicSpy: jest.SpyInstance;
  const effectService = new MockEffectService();

  beforeEach(() => {
    createStore();
    facadeRegistry.register('testFeature', 'testEntity', ClassicNgrxFacade);
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
    effectServiceLoadByIndexesClassicSpy = jest
      .spyOn(effectService, 'loadByIndexes')
      .mockImplementation((parentId, childField, startIndex, length) => {
        return of({
          startIndex,
          indexes: [],
          length,
        });
      });
    mockStore = { dispatch: jest.fn() };
    mockStoreDispatchSpy = jest.spyOn(mockStore, 'dispatch');

    actions = actionFactory<SmartNgRXRowBase>('testFeature', 'testEntity');
    actionService = facadeRegistry.register(
      'testFeature',
      'testEntity',
    ) as unknown as Omit<FacadeBase, 'loadByIndexesService'> & {
      loadByIndexesService: LoadByIndexesClassic;
    };
    const mockEntitiesSubject = new Subject<Dictionary<SmartNgRXRowBase>>();
    mockEntitiesSubject.next({} as Dictionary<SmartNgRXRowBase>);
    mockEntities = mockEntitiesSubject.asObservable();
    actionService.loadByIndexesService = new LoadByIndexesClassic(
      'testFeature',
      'testEntity',
      mockStore as Store,
    );
    loadByIndexes =
      actionService.loadByIndexesService as unknown as LoadByIndexesClassicPublic;
  });
  afterEach(() => {
    jest.clearAllMocks();
    entityRegistry.unregister('testFeature', 'testEntity');
  });

  describe('init', () => {
    it('should initialize the service and start the dispatcher', () => {
      const spyDispatcher = jest.spyOn(
        loadByIndexes,
        'loadByIndexesDispatcher',
      );

      loadByIndexes.init(actions, mockEntities);

      expect(loadByIndexes.actions).toBe(actions);
      expect(loadByIndexes.entities).toBe(mockEntities);
      expect(spyDispatcher).toHaveBeenCalled();
    });
  });

  describe('loadByIndexes', () => {
    it('should queue up loading the ids for the indexes', () => {
      const mockSubject = new Subject<{
        parentId: string;
        childField: string;
        indexes: number[];
      }>();
      const mockSubjectNextSpy = jest.spyOn(mockSubject, 'next');
      loadByIndexes.loadByIndexesSubject = mockSubject;

      [1, 2, 3].forEach((i) => {
        loadByIndexes.loadByIndexes('parentId', 'childField', i);
      });

      expect(mockSubjectNextSpy).toHaveBeenCalledWith({
        parentId: 'parentId',
        childField: 'childField',
        index: 1,
      });
      expect(mockSubjectNextSpy).toHaveBeenCalledWith({
        parentId: 'parentId',
        childField: 'childField',
        index: 2,
      });
      expect(mockSubjectNextSpy).toHaveBeenCalledWith({
        parentId: 'parentId',
        childField: 'childField',
        index: 3,
      });
    });
  });

  describe('loadByIndexesDispatcher', () => {
    it('should call the loadByIndexes method on the effect service after buffering', fakeAsync(() => {
      loadByIndexes.init(actions, mockEntities);
      loadByIndexes.loadByIndexes('parent1', 'child1', 1);
      loadByIndexes.loadByIndexes('parent1', 'child1', 2);
      loadByIndexes.loadByIndexes('parent1', 'child1', 3);

      tick(100);
      flushMicrotasks();

      expect(effectServiceLoadByIndexesClassicSpy).toHaveBeenCalled();
      expect(effectServiceLoadByIndexesClassicSpy).toHaveBeenCalledWith(
        'parent1',
        'child1',
        1,
        3,
      );
    }));
  });

  describe('loadByIndexesSuccess', () => {
    it('should update the childField with the provided ids', () => {
      const mockRow = {
        id: 'parent1',
        childField: { indexes: [null, null, null], length: 3 },
      };
      mockEntities = of({ parent1: mockRow });
      loadByIndexes.init(actions, mockEntities);

      const spyProcessSuccess = jest
        .spyOn(loadByIndexes, 'processLoadByIndexesSuccess')
        .mockReturnValue({ indexes: ['id1', 'id2', 'id3'], length: 3 });

      loadByIndexes.loadByIndexesSuccess('parent1', 'childField', {
        startIndex: 0,
        indexes: ['id1', 'id2', 'id3'],
        length: 3,
      });

      expect(spyProcessSuccess).toHaveBeenCalled();
      expect(mockStoreDispatchSpy).toHaveBeenCalledWith(
        actions.storeRows({
          rows: [
            {
              id: 'parent1',
              childField: { indexes: ['id1', 'id2', 'id3'], length: 3 },
            } as SmartNgRXRowBase,
          ],
        }),
      );
    });
  });

  describe('processLoadByIndexesClassicSuccess', () => {
    it('should update the field with new indexes', () => {
      const field = {
        indexes: [null, null, null] as unknown as string[],
        length: 3,
      };
      const array = {
        startIndex: 0,
        indexes: ['id1', 'id2', 'id3'],
        length: 3,
      };

      const result = loadByIndexes.processLoadByIndexesSuccess(field, array);

      expect(result).toEqual({ indexes: ['id1', 'id2', 'id3'], length: 3 });
    });

    it('should handle new row case', () => {
      const field = { indexes: ['id1', 'id2', 'newId'], length: 3 };
      const array = {
        startIndex: 0,
        indexes: ['id1', 'id2', 'newId'],
        length: 3,
      };

      jest
        .spyOn(smartToolsCoreModule.newRowRegistry, 'isNewRow')
        .mockReturnValue(true);

      const result = loadByIndexes.processLoadByIndexesSuccess(field, array);

      expect(result).toEqual({
        indexes: ['id1', 'id2', 'newId', 'newId'],
        length: 4,
      });
    });
  });
});
