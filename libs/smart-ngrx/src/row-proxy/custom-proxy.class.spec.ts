import { TestBed } from '@angular/core/testing';
import { createEntityAdapter } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

import { castTo } from '../common/cast-to.function';
import { ActionGroup } from '../functions/action-group.interface';
import { adapterForEntity } from '../functions/adapter-for-entity.function';
import { ArrayProxy } from '../selector/array-proxy.class';
import { store as storeFunction } from '../selector/store.function';
import { ChildDefinition } from '../types/child-definition.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { CustomProxy } from './custom-proxy.class';

interface TestType extends SmartNgRXRowBase {
  id: string;
  name: string;
  isDirty?: boolean;
  children: string[];
}

describe('CustomProxy', () => {
  let parentActions: ActionGroup<SmartNgRXRowBase>;
  let actions: ActionGroup<SmartNgRXRowBase>;

  const childArray: string[] = ['department1', 'department2'];
  const child = {
    ids: ['department1', 'department2'],
    entities: {
      department1: {
        id: 'department1',
        name: 'Department 1',
        isDirty: false,
      },
      department2: {
        id: 'department2',
        name: 'Department 2',
        isDirty: false,
      },
    },
  };

  let arr: ArrayProxy<TestType, SmartNgRXRowBase>;
  let store: Store;
  let dispatchSpy: jest.SpyInstance;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: {},
        }),
      ],
    });
    store = TestBed.inject(Store) as Store;
    storeFunction(store);
    adapterForEntity('feature', 'department', createEntityAdapter());

    arr = new ArrayProxy<TestType, SmartNgRXRowBase>(childArray, child, {
      childFeature: 'feature',
      childEntity: 'department',
      parentFeature: 'parentFeature',
      parentEntity: 'parentEntity',
      parentField: 'children',
    } as unknown as ChildDefinition<TestType>);

    const actionsAndStore = arr.getActionsAndStore();
    parentActions = actionsAndStore.parentActions;
    actions = actionsAndStore.actions;
    dispatchSpy = jest.spyOn(store, 'dispatch');
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when we update a field', () => {
    describe('and the row has a parentId', () => {
      it('should dispatch the add action', () => {
        // Arrange
        const thisRow = {
          id: 'parent1',
          name: 'Parent 1',
          isDirty: false,
          children: ['department1', 'department2', 'department3'],
          parentId: 'p1',
        } as TestType;
        const customProxy = new CustomProxy<TestType, SmartNgRXRowBase>(
          thisRow,
          castTo<ActionGroup<TestType>>(parentActions),
          actions,
        );
        // Act
        castTo<TestType>(customProxy).name = 'parent a';
        // Assert
        expect(dispatchSpy).toHaveBeenCalledWith(
          expect.objectContaining(
            parentActions.add({
              row: {
                id: 'parent1',
                name: 'parent a',
                isDirty: false,
                parentId: 'p1',
                children: ['department1', 'department2', 'department3'],
              } as SmartNgRXRowBase,
              parentId: 'p1',
            } as {
              row: SmartNgRXRowBase;
              parentId: string;
              parentActions: ActionGroup<SmartNgRXRowBase>;
            }),
          ),
        );
      });
    });
    describe("and the row doesn't have a parentId", () => {
      it('should dispatch the add action', () => {
        // Arrange
        const thisRow = {
          id: 'parent1',
          name: 'Parent 1',
          isDirty: false,
          children: ['department1', 'department2', 'department3'],
        } as TestType;
        const customProxy = new CustomProxy<TestType, SmartNgRXRowBase>(
          thisRow,
          castTo<ActionGroup<TestType>>(parentActions),
          actions,
        );
        // Act
        castTo<TestType>(customProxy).name = 'parent a';
        // Assert
        expect(dispatchSpy).toHaveBeenCalledWith(
          parentActions.update({
            new: {
              row: {
                id: 'parent1',
                name: 'parent a',
                isDirty: false,
                children: ['department1', 'department2', 'department3'],
              } as SmartNgRXRowBase,
            },
            old: {
              row: {
                id: 'parent1',
                name: 'Parent 1',
                isDirty: false,
                children: ['department1', 'department2', 'department3'],
              } as SmartNgRXRowBase,
            },
          }),
        );
      });
    });
  });
});
