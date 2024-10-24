import { fakeAsync, tick } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';

import * as registerEntityRowsModule from '../../mark-and-delete/register-entity-rows.function';
import { SmartNgRXRowBase } from '../../types/smart-ngrx-row-base.interface';
import { actionFactory } from '../action.factory';
import { ActionGroup } from '../action-group.interface';
import { LoadByIds } from './load-by-ids.class';

interface SomeDataRow extends SmartNgRXRowBase {
  someData: string;
}

// Mock types
type MockStore = Partial<Store>;

describe('LoadByIds', () => {
  let loadByIds: LoadByIds;
  let mockStore: MockStore;
  let actions: ActionGroup<SomeDataRow>;
  let mockEntities: BehaviorSubject<Record<string, SomeDataRow>>;

  beforeEach(() => {
    mockStore = {
      dispatch: jest.fn(),
    };
    jest
      .spyOn(registerEntityRowsModule, 'registerEntityRows')
      .mockImplementation((_, __, rows) => rows);
    jest.spyOn(mockStore, 'dispatch');
    actions = actionFactory<SomeDataRow>('testFeature', 'testEntity');
    mockEntities = new BehaviorSubject<Record<string, SomeDataRow>>({});

    loadByIds = new LoadByIds('testFeature', 'testEntity', mockStore as Store);
    loadByIds.init(
      actions as unknown as ActionGroup,
      mockEntities.asObservable(),
      (id: string) => ({ id, isLoading: false }) as SmartNgRXRowBase,
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
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
        loadByIds.loadByIds([id]);
        tick(0);
      });

      tick(300);
      tick();

      expect(mockStore.dispatch).toHaveBeenCalledWith(
        actions.loadByIds({ ids: ['3', '5'] }),
      );
    }));

    it('should not dispatch action if all ids are filtered out', fakeAsync(() => {
      const ids = ['index-1', 'indexNoOp-2'];
      const existingEntities: Record<string, SomeDataRow> = {};

      jest.spyOn(mockStore, 'dispatch');

      mockEntities.next(existingEntities);

      ids.forEach((id) => {
        loadByIds.loadByIds([id]);
        tick(0);
      });

      tick(300);
      tick();

      expect(mockStore.dispatch).not.toHaveBeenCalled();
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
