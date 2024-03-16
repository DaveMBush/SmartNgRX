import { TestBed } from '@angular/core/testing';
import { createEntityAdapter } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

import { castTo } from '../common/cast-to.function';
import { actionFactory } from '../functions/action.factory';
import { adapterForEntity } from '../functions/adapter-for-entity.function';
import { StringLiteralSource } from '../ngrx-internals/string-literal-source.type';
import { ArrayProxy } from '../selector/array-proxy.class';
import { store as storeFunction } from '../selector/store.function';
import { ChildDefinition } from '../types/child-definition.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { SmartNgRXRowBaseSelector } from '../types/smart-ngrx-row-base-selector.type';
import { rowProxy } from './row-proxy.function';
interface ProxyRow extends SmartNgRXRowBase {
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
  const childDefinition: ChildDefinition<ProxyRow> = {
    childFeature: castTo<StringLiteralSource<string>>('feature'),
    childEntity: castTo<StringLiteralSource<string>>('entity'),
    childSelector: null as unknown as SmartNgRXRowBaseSelector,
    parentField: 'children',
    parentFeature: castTo<StringLiteralSource<string>>('parentFeature'),
    parentEntity: castTo<StringLiteralSource<string>>('parentEntity'),
  };
  adapterForEntity('feature', 'entity', createEntityAdapter());
  const children = new ArrayProxy<ProxyRow, typeof childEntity>(
    ['1'],
    { ids: ['1'], entities: { 1: childEntity } },
    childDefinition,
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
    const actions = actionFactory<ProxyRow, 'feature', 'entity'>(
      'feature',
      'entity',
    );
    const parentActions = actionFactory<
      SmartNgRXRowBase,
      'parentFeature',
      'parentEntity'
    >('parentFeature', 'parentEntity');
    proxyRow = rowProxy<ProxyRow, SmartNgRXRowBase>(
      castTo<ProxyRow>(row),
      actions,
      parentActions,
    );
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
