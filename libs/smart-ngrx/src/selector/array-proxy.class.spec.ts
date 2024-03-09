import { createEntityAdapter } from '@ngrx/entity';

import { castTo } from '../common/cast-to.function';
import { isProxy } from '../common/is-proxy.const';
import { adapterForEntity } from '../functions/adapter-for-entity.function';
import { registerEntity } from '../functions/register-entity.function';
import { registerGlobalMarkAndDeleteInit } from '../mark-and-delete/mark-and-delete-init';
import { ChildDefinition } from '../types/child-definition.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { ArrayProxy } from './array-proxy.class';
import { isArrayProxy } from './is-array-proxy.function';

interface TestType extends SmartNgRXRowBase {
  id: string;
  name: string;
}

describe('proxyArray', () => {
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

  registerGlobalMarkAndDeleteInit({
    markDirtyTime: 15 * 60 * 1000,
    removeTime: 30 * 60 * 1000,
    runInterval: 60 * 1000,
    markDirtyFetchesNew: true,
  });
  registerEntity('feature', 'department', {
    defaultRow: (id: string) => ({ id, name: '', isDirty: false }),
    markAndDeleteEntityMap: new Map(),
    markAndDeleteInit: {
      markDirtyTime: 15 * 60 * 1000,
      removeTime: 30 * 60 * 1000,
      runInterval: 60 * 1000,
      markDirtyFetchesNew: true,
    },
  });
  adapterForEntity('feature', 'entity', createEntityAdapter());
  adapterForEntity('feature', 'department', createEntityAdapter());

  const arr = new ArrayProxy<TestType, SmartNgRXRowBase>(childArray, child, {
    childFeature: 'feature',
    childEntity: 'department',
    parentFeature: 'parentFeature',
    parentEntity: 'parentEntity',
    parentField: 'children',
  } as unknown as ChildDefinition<TestType>);
  arr.init();

  it('creates an array that proxies to the actual entity', () => {
    expect(JSON.parse(JSON.stringify(arr[0]))).toEqual({
      id: 'department1',
      name: 'Department 1',
      isDirty: false,
    });
    expect(JSON.parse(JSON.stringify(arr[1]))).toEqual({
      id: 'department2',
      name: 'Department 2',
      isDirty: false,
    });
  });

  it('has the isProxy property for internal usage', () => {
    expect(castTo<Record<string, boolean>>(arr)[isProxy]).toBe(true);
  });

  it('gives access to the raw array', () => {
    expect(
      castTo<ArrayProxy<TestType, SmartNgRXRowBase>>(arr).rawArray,
    ).toEqual(['department1', 'department2']);
  });
  describe('if we pass in the proxy as the child', () => {
    let arr2: ArrayProxy<TestType, SmartNgRXRowBase>;
    beforeEach(() => {
      // give parent the children from above
      arr2 = new ArrayProxy<TestType, SmartNgRXRowBase>(arr, child, {
        childFeature: 'feature',
        childEntity: 'department',
        parentFeature: 'parentFeature',
        parentEntity: 'parentEntity',
        parentField: 'children',
      } as unknown as ChildDefinition<TestType>);
      arr2.init();
    });
    it('should not re-proxy the child', () => {
      expect(isArrayProxy(arr2)).toBe(true);
      expect(isArrayProxy(arr2.rawArray)).toBe(false);
    });
  });
});
