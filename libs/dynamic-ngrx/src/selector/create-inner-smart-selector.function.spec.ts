import { EntityState } from '@ngrx/entity';
import { DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';

import { castTo } from '../common/cast-to.function';
import { MarkAndDelete } from '../types/mark-and-delete.interface';
import { ProxyArray } from '../types/proxy-array.interface';
import { createInnerSmartSelector } from './create-inner-smart-selector.function';
import { Entity } from './mocks/entity.interface';
import { entityStateFactory } from './mocks/entity-state.factory';

const department1 = 'department-1';
const department2 = 'department-2';

const mockDispatch = jest.fn();

jest.mock('./store.function', () => ({
  __esModule: true,
  store: () => ({
    dispatch: mockDispatch,
  }),
}));


describe('createInnerSmartSelector', () => {
  let selectEntity: MemoizedSelector<
    object,
    EntityState<{ id: string; name: string; children: string[] }>,
    DefaultProjectorFn<
      EntityState<{ id: string; name: string; children: string[] }>
    >
  >;
  let child1: EntityState<MarkAndDelete>;
  let parent: EntityState<MarkAndDelete>;
  let result: EntityState<{ id: string; name: string; children: string[] }>;
  beforeEach(() => {
    selectEntity = createInnerSmartSelector(
      jest.fn() as unknown as MemoizedSelector<
        object,
        EntityState<{ id: string; name: string; children: string[] }>
      >,
      {
        childSelector: jest.fn() as unknown as MemoizedSelector<
          object,
          EntityState<MarkAndDelete>
        >,
        childAction: jest.fn(),
        defaultChildRow: [],
        childName: 'children',
      }
    );
    child1 = entityStateFactory({
      parentCount: 2,
      parentType: 'folder',
      childCount: 0,
      childType: 'list',
    });

    parent = entityStateFactory({
      parentCount: 2,
      childCount: 2,
      parentType: 'department',
      childType: 'folder',
    });
    // verify there is no proxy.
    result = selectEntity.projector(parent, child1);
  });
  it("create proxies for children that don't exist", () => {
    expect(result.entities[department1]?.children).toHaveLength(2);
    expect(result.entities[department2]?.children).toHaveLength(2);
    expect(
      castTo<ProxyArray<Entity>>(result.entities[department1]?.children)
        .θisProxyθ
    ).toBe(true);
    expect(
      castTo<ProxyArray<Entity>>(result.entities[department2]?.children)
        .θisProxyθ
    ).toBe(true);
    expect(
      castTo<ProxyArray<Entity>>(result.entities[department1]?.children)
        .rawArray
    ).toEqual(['folder-1', 'folder-2']);
    expect(
      castTo<ProxyArray<Entity>>(result.entities[department2]?.children)
        .rawArray
    ).toEqual(['folder-3', 'folder-4']);
    expect(result.entities[department1]?.children[0]).toStrictEqual({
      id: 'folder-1',
      name: 'Folder 1',
      isDirty: false,
      children: [],
    });
    expect(result.entities[department1]?.children[1]).toStrictEqual({
      id: 'folder-2',
      name: 'Folder 2',
      isDirty: false,
      children: [],
    });
  });
  describe('if we already have items for the children', () => {
    beforeEach(() => {
      // give parent the children from above
      result = selectEntity.projector(result, child1);
    });
    it('should not re-proxy the child', () => {
      expect(result.entities[department1]?.children).toHaveLength(2);
      expect(
        castTo<ProxyArray<Entity>>(result.entities[department1]?.children)
          .θisProxyθ
      ).toBeTruthy();
      expect(
        castTo<ProxyArray<Entity>>(
          castTo<ProxyArray<Entity>>(result.entities[department1]?.children)
            .rawArray
        ).θisProxyθ
      ).toBeFalsy();
      expect(result.entities[department2]?.children).toHaveLength(2);
    });
  });
});
