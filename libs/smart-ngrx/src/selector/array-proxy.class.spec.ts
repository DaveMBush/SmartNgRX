import { castTo } from '../common/cast-to.function';
import { isProxy } from '../common/is-proxy.const';
import { registerEntity } from '../functions/register-entity.function';
import { registerGlobalMarkAndDeleteInit } from '../mark-and-delete/mark-and-delete-init';
import { MarkAndDelete } from '../types/mark-and-delete.interface';
import { ArrayProxy } from './array-proxy.class';
import { isArrayProxy } from './is-array-proxy.function';

interface TestType extends MarkAndDelete {
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
  });
  registerEntity('feature', 'department', {
    defaultRow: (id: string) => ({ id, name: '', isDirty: false }),
    markAndDeleteEntityMap: new Map(),
    markAndDeleteInit: {
      markDirtyTime: 15 * 60 * 1000,
      removeTime: 30 * 60 * 1000,
    },
  });

  const arr = new ArrayProxy<TestType, 'feature', 'department'>(
    childArray,
    child,
    'feature',
    'department',
  );
  arr.init();

  it('creates an array that proxies to the actual entity', () => {
    expect(arr[0]).toEqual({
      id: 'department1',
      name: 'Department 1',
      isDirty: false,
    });
    expect(arr[1]).toEqual({
      id: 'department2',
      name: 'Department 2',
      isDirty: false,
    });
  });

  it('has the isProxy property for internal usage', () => {
    expect(castTo<Record<string, boolean>>(arr)[isProxy]).toBe(true);
  });

  it('gives access to the raw array', () => {
    expect(castTo<ArrayProxy<TestType>>(arr).rawArray).toEqual([
      'department1',
      'department2',
    ]);
  });
  describe('if we pass in the proxy as the child', () => {
    let arr2: ArrayProxy<TestType, 'feature', 'department'>;
    beforeEach(() => {
      // give parent the children from above
      arr2 = new ArrayProxy<TestType, 'feature', 'department'>(
        arr,
        child,
        'feature',
        'department',
      );
      arr2.init();
    });
    it('should not re-proxy the child', () => {
      expect(isArrayProxy(arr2)).toBe(true);
      expect(isArrayProxy(arr2.rawArray)).toBe(false);
    });
  });
});
