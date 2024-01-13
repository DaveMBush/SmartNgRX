import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

import { castTo } from '../common/cast-to.function';
import { actionFactory } from '../functions/action.factory';
import { ArrayProxy } from '../selector/array-proxy.class';
import { store as storeFunction } from '../selector/store.function';
import { MarkAndDelete } from '../types/mark-and-delete.interface';
import { rowProxy } from './row-proxy.function';
interface ProxyRow extends MarkAndDelete {
  id: number;
  name: string;
  isDirty?: boolean;
  children: string[];
}

describe('row-proxy.function.ts', () => {
  let store: Store;
  let dispatchSpy: jest.SpyInstance;
  const childEntity = {
    id: '1',
    name: 'test',
    isDirty: false,
    children: ['1'],
  };
  const children = new ArrayProxy(
    ['1'],
    { ids: ['1'], entities: { 1: childEntity } },
    'feature',
    'entity',
  );
  children.init();
  const row = { id: '1', name: 'test', isDirty: false, children };
  let proxyRow: ProxyRow;
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
    dispatchSpy = jest.spyOn(store, 'dispatch');
    const actions = actionFactory<'feature', 'entity', ProxyRow>(
      'feature',
      'entity',
    );
    proxyRow = rowProxy<ProxyRow>(castTo<ProxyRow>(row), actions);
  });
  describe('when I retrieve an unset property', () => {
    it('returns the value from the row', () => {
      expect(proxyRow.name).toBe('test');
    });
  });
  describe('when we set a property on the proxy', () => {
    beforeEach(() => {
      proxyRow.name = 'test2';
    });
    it('properly dispatches the update action', () => {
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: '[featureψentity] Update',
        new: {
          row: { id: '1', name: 'test2', isDirty: false, children: ['1'] },
        },
        old: {
          row: { id: '1', name: 'test', isDirty: false, children: ['1'] },
        },
      });
    });
    it('returns the new value when we get the property', () => {
      expect(proxyRow.name).toBe('test2');
    });
    it('JSON.stringifies the new value in', () => {
      expect(JSON.parse(JSON.stringify(proxyRow))).toEqual({
        id: '1',
        name: 'test2',
        isDirty: false,
        children: ['1'],
      });
    });
  });
});
