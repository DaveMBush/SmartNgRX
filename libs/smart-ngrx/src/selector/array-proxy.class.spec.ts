import { createAction, props } from '@ngrx/store';

import { castTo } from '../common/cast-to.function';
import { isProxy } from '../common/is-proxy.const';
import { MarkAndDelete } from '../types/mark-and-delete.interface';
import { ArrayProxy } from './array-proxy.class';
import { isArrayProxy } from './is-array-proxy.function';

interface TestType extends MarkAndDelete {
  id: string;
  name: string;
}

const mockAction = createAction(
  '[mock] fetch department',
  props<{ ids: string[] }>(),
);

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

  const arr = new ArrayProxy<TestType>(
    childArray,
    child,
    mockAction,
    (id: string) => ({ id, name: '', isDirty: false }),
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
    let arr2: ArrayProxy<TestType>;
    beforeEach(() => {
      // give parent the children from above
      arr2 = new ArrayProxy<TestType>(arr, child, mockAction, (id: string) => ({
        id,
        name: '',
        isDirty: false,
      }));
      arr2.init();
    });
    it('should not re-proxy the child', () => {
      expect(isArrayProxy(arr2)).toBe(true);
      expect(isArrayProxy(arr2.rawArray)).toBe(false);
    });
  });
});
