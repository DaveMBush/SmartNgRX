import { Dictionary } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { Observable, of, Subject } from 'rxjs';

import * as forNextModule from '../../common/for-next.function';
import * as newRowRegistryModule from '../../selector/new-row-registry.class';
import { PartialArrayDefinition } from '../../types/partial-array-definition.interface';
import { SmartNgRXRowBase } from '../../types/smart-ngrx-row-base.interface';
import { VirtualArrayContents } from '../../types/virtual-array-contents.interface';
import { actionFactory } from '../action.factory';
import { ActionGroup } from '../action-group.interface';
import { LoadByIndexes } from './load-by-indexes.class';

jest.mock(
  './buffer-indexes.function',
  () =>
    ({
      ...jest.requireActual('./buffer-indexes.function'),
      bufferIndexes: () => (s: Observable<unknown>) => s,
    }) as typeof jest,
);

interface LoadByIndexesPublic
  extends Omit<
    LoadByIndexes,
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

describe('LoadByIndexes', () => {
  let loadByIndexes: LoadByIndexesPublic;
  let mockStore: Partial<Store>;
  let actions: ActionGroup;
  let mockEntities: Observable<Dictionary<SmartNgRXRowBase>>;
  let mockStoreDispatchSpy: jest.SpyInstance;

  beforeEach(() => {
    mockStore = { dispatch: jest.fn() };
    mockStoreDispatchSpy = jest.spyOn(mockStore, 'dispatch');

    actions = actionFactory<SmartNgRXRowBase>('testFeature', 'testEntity');

    const mockEntitiesSubject = new Subject<Dictionary<SmartNgRXRowBase>>();
    mockEntitiesSubject.next({} as Dictionary<SmartNgRXRowBase>);
    mockEntities = mockEntitiesSubject.asObservable();

    loadByIndexes = new LoadByIndexes(
      'testFeature',
      'testEntity',
      mockStore as Store,
    ) as unknown as LoadByIndexesPublic;
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

      loadByIndexes.loadByIndexes('parentId', 'childField', [1, 2, 3]);

      expect(mockSubjectNextSpy).toHaveBeenCalledWith({
        parentId: 'parentId',
        childField: 'childField',
        indexes: [1, 2, 3],
      });
    });
  });

  describe('loadByIndexesDispatcher', () => {
    it('should dispatch the loadByIndexes action after buffering', () => {
      const mockSubject = new Subject<{
        parentId: string;
        childField: string;
        indexes: number[];
      }>();
      loadByIndexes.loadByIndexesSubject = mockSubject;
      loadByIndexes.actions = actions;

      loadByIndexes.init(actions, mockEntities);
      mockSubject.next({
        parentId: 'parent1',
        childField: 'child1',
        indexes: [1, 2, 3],
      });

      expect(mockStoreDispatchSpy).toHaveBeenCalledWith(
        actions.loadByIndexes({
          parentId: 'parent1',
          childField: 'child1',
          indexes: [1, 2, 3],
        }),
      );
    });
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

  describe('processLoadByIndexesSuccess', () => {
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

      jest
        .spyOn(forNextModule, 'forNext')
        .mockImplementation((arr, callback) => {
          arr.forEach((item, index) => callback(item, index, arr));
        });

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
        .spyOn(forNextModule, 'forNext')
        .mockImplementation((arr, callback) => {
          arr.forEach((item, index) => callback(item, index, arr));
        });

      jest
        .spyOn(newRowRegistryModule.newRowRegistry, 'isNewRow')
        .mockReturnValue(true);

      const result = loadByIndexes.processLoadByIndexesSuccess(field, array);

      expect(result).toEqual({
        indexes: ['id1', 'id2', 'newId', 'newId'],
        length: 4,
      });
    });
  });
});
