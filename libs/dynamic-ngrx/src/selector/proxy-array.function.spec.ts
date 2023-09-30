import { createAction, props } from '@ngrx/store';

import { castTo } from '../common/cast-to.function';
import { ProxyArray } from '../types/proxy-array.interface';
import { proxyArray } from './proxy-array.function';

const mockAction = createAction(
  '[mock] fetch department',
  props<{ ids: string[] }>()
);

describe('proxyArray', () => {
  const childArray = ['department1', 'department2'];
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

  const arr = proxyArray<string>(
    childArray,
    child,
    mockAction,
    'default-department'
  );

  it('create an array that proxies to the actual entity', () => {
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

  it('has the θisProxyθ property for internal usage', () => {
    expect(castTo<ProxyArray<string>>(arr).θisProxyθ).toBe(true);
  });

  it('gives access to the raw array', () => {
    expect(castTo<ProxyArray<string>>(arr).rawArray).toEqual([
      'department1',
      'department2',
    ]);
  });
});
