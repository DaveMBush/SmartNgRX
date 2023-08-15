import { createAction, props } from '@ngrx/store';

import { castTo } from '../common/cast-to.function';
import { ProxyArray } from '../types/proxy-array.interface';
import { proxyArray } from './proxy-array.function';

const mockAction = createAction(
  '[mock] fetch space',
  props<{ ids: string[] }>()
);

describe('proxyArray', () => {
  const childArray = ['space1', 'space2'];
  const child = {
    ids: ['space1', 'space2'],
    entities: {
      space1: {
        id: 'space1',
        name: 'Space 1',
        isDirty: false,
      },
      space2: {
        id: 'space2',
        name: 'Space 2',
        isDirty: false,
      },
    },
  };

  const arr = proxyArray<string>(
    childArray,
    child,
    mockAction,
    'default-space'
  );

  it('create an array that proxies to the actual entity', () => {
    expect(arr[0]).toEqual({
      id: 'space1',
      name: 'Space 1',
      isDirty: false,
    });
    expect(arr[1]).toEqual({
      id: 'space2',
      name: 'Space 2',
      isDirty: false,
    });
  });

  it('has the θisProxyθ property for internal usage', () => {
    expect(castTo<ProxyArray<string>>(arr).θisProxyθ).toBe(true);
  });

  it('gives access to the raw array', () => {
    expect(castTo<ProxyArray<string>>(arr).rawArray).toEqual([
      'space1',
      'space2',
    ]);
  });
});
