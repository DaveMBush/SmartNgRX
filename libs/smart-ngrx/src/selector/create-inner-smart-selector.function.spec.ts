import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';

import { castTo } from '../common/cast-to.function';
import { isProxy } from '../common/is-proxy.const';
import { adapterForEntity } from '../functions/adapter-for-entity.function';
import {
  registerEntity,
  unregisterEntity,
} from '../functions/register-entity.function';
import { StringLiteralSource } from '../ngrx-internals/string-literal-source.type';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { ArrayProxy } from './array-proxy.class';
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

function itCreatesProxiesForChildrenThatDontExist(
  result: EntityState<{
    id: string;
    name: string;
    children: string[];
  }>,
) {
  expect(result.entities[department1]?.children).toHaveLength(2);
  expect(result.entities[department2]?.children).toHaveLength(2);
  expect(
    castTo<Record<string, boolean>>(result.entities[department1]?.children)[
      isProxy
    ],
  ).toBe(true);
  expect(
    castTo<Record<string, boolean>>(result.entities[department2]?.children)[
      isProxy
    ],
  ).toBe(true);
  expect(
    castTo<ArrayProxy<Entity, SmartNgRXRowBase>>(
      result.entities[department1]?.children,
    ).rawArray,
  ).toEqual(['folder-1', 'folder-2']);
  expect(
    castTo<ArrayProxy<Entity, SmartNgRXRowBase>>(
      result.entities[department2]?.children,
    ).rawArray,
  ).toEqual(['folder-3', 'folder-4']);
  expect(
    JSON.parse(JSON.stringify(result.entities[department1]?.children[0])),
  ).toStrictEqual({
    id: 'folder-1',
    name: 'Folder 1',
    isDirty: false,
    children: [],
  });
  expect(
    JSON.parse(JSON.stringify(result.entities[department1]?.children[1])),
  ).toStrictEqual({
    id: 'folder-2',
    name: 'Folder 2',
    isDirty: false,
    children: [],
  });
}

describe('createInnerSmartSelector', () => {
  let selectEntity: MemoizedSelector<
    object,
    EntityState<{ id: string; name: string; children: string[] }>,
    DefaultProjectorFn<
      EntityState<{ id: string; name: string; children: string[] }>
    >
  >;
  let child1: EntityState<SmartNgRXRowBase>;
  let parent: EntityState<SmartNgRXRowBase>;
  let result: EntityState<{ id: string; name: string; children: string[] }>;
  function commonSetup() {
    adapterForEntity('feature', 'entityName', createEntityAdapter());
    registerEntity('feature', 'entityName', {
      markAndDeleteEntityMap: new Map(),
      markAndDeleteInit: {
        markDirtyTime: 15 * 60 * 1000,
        removeTime: 30 * 60 * 1000,
        markDirtyFetchesNew: true,
        runInterval: 60 * 1000,
      },
      defaultRow: (id: string) => ({
        id,
        isDirty: false,
        children: [],
        name: '',
      }),
    });
    selectEntity = createInnerSmartSelector(
      jest.fn() as unknown as MemoizedSelector<
        object,
        EntityState<{ id: string; name: string; children: string[] }>
      >,
      {
        childFeature: castTo<StringLiteralSource<string>>('feature'),
        childEntity: castTo<StringLiteralSource<string>>('entityName'),
        parentFeature: castTo<StringLiteralSource<string>>('parentFeature'),
        parentEntity: castTo<StringLiteralSource<string>>('parentEntity'),
        childSelector: jest.fn() as unknown as MemoizedSelector<
          object,
          EntityState<SmartNgRXRowBase>
        >,
        parentField: 'children',
      },
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
  }

  describe('when the child is not frozen', () => {
    beforeEach(() => {
      commonSetup();
      /* jscpd:ignore-start */
      // verify there is no proxy.
      result = selectEntity.projector(parent, child1);
      /* jscpd:ignore-end */
    });
    afterEach(() => {
      unregisterEntity('feature', 'entityName');
    });
    // eslint-disable-next-line jest/expect-expect -- expects are in the function
    it("creates proxies for children that don't exist", () => {
      itCreatesProxiesForChildrenThatDontExist(result);
    });
  });
  describe('when the child is frozen', () => {
    beforeEach(() => {
      commonSetup();

      Object.freeze(
        castTo<{ children: unknown[] }>(parent.entities[department1])?.children,
      );
      Object.freeze(
        castTo<{ children: unknown[] }>(parent.entities[department2])?.children,
      );

      result = selectEntity.projector(parent, child1);
    });
    afterEach(() => {
      unregisterEntity('feature', 'entityName');
    });
    // eslint-disable-next-line jest/expect-expect -- expects are in the function
    it("creates proxies for children that don't exist", () => {
      itCreatesProxiesForChildrenThatDontExist(result);
    });
  });
});
