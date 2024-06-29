import { createEntityAdapter } from '@ngrx/entity';

import { ActionService } from '../actions/action.service';
import { assert } from '../common/assert.function';
import { castTo } from '../common/cast-to.function';
import { entityDefinitionCache } from '../registrations/entity-definition-cache.function';
import {
  registerEntity,
  unregisterEntity,
} from '../registrations/register-entity.function';
import { RowProxy } from '../row-proxy/row-proxy.class';
import { createStore } from '../tests/functions/create-store.function';
import { ChildDefinition } from '../types/child-definition.interface';
import { EntityAttributes } from '../types/entity-attributes.interface';
import { SmartEntityDefinition } from '../types/smart-entity-definition.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { ArrayProxy } from './array-proxy.class';
import * as getArrayItem from './get-array-item.function';

const childDefinition = {
  childFeature: 'feature',
  childEntity: 'entity',
} as unknown as ChildDefinition<SmartNgRXRowBase>;

describe('ArrayProxy', () => {
  let arrayProxy: ArrayProxy | undefined;
  let originalArray: string[] = [];
  let getArrayItemSpy: jest.SpyInstance;
  function assertArrayProxy(ap: boolean): asserts ap {
    assert(ap, 'arrayProxy is undefined');
  }
  beforeEach(() => {
    registerEntity(childDefinition.childFeature, childDefinition.childEntity, {
      markAndDeleteInit: {},
    } as EntityAttributes);

    getArrayItemSpy = jest
      .spyOn(getArrayItem, 'getArrayItem')
      .mockImplementation(() => ({}));
    createStore();
    entityDefinitionCache(
      childDefinition.childFeature,
      childDefinition.childEntity,
      {
        entityAdapter: createEntityAdapter<SmartNgRXRowBase>(),
      } as SmartEntityDefinition<SmartNgRXRowBase>,
    );
  });
  afterEach(() => {
    unregisterEntity(childDefinition.childFeature, childDefinition.childEntity);

    arrayProxy = undefined;
  });
  describe('init()', () => {
    describe('when the childArray has never been proxied before', () => {
      describe('and it is not frozen', () => {
        beforeEach(() => {
          originalArray = ['1', '2', '3'];
          arrayProxy = new ArrayProxy<object, SmartNgRXRowBase>(
            originalArray,
            { ids: [], entities: {} },
            childDefinition,
          );
        });
        it('should set the rawArray to the childArray and set the childArray to an empty array', () => {
          assertArrayProxy(!!arrayProxy);
          arrayProxy.init();
          // make sure rawArray is the same object as the original array
          expect(arrayProxy.rawArray).toBe(originalArray);
          expect(arrayProxy.length).toEqual(3);
          expect(
            castTo<{ childArray: string[] }>(arrayProxy).childArray,
          ).toEqual([]);
        });
      });
      describe('and the childArray  is frozen', () => {
        beforeEach(() => {
          originalArray = ['1', '2', '3'];
          Object.freeze(originalArray);
          arrayProxy = new ArrayProxy<object, SmartNgRXRowBase>(
            originalArray,
            { ids: [], entities: {} },
            childDefinition,
          );
          arrayProxy.init();
        });
        it('should set the rawArray a copy of the childArray and set the childArray to an empty array', () => {
          assertArrayProxy(!!arrayProxy);
          expect(arrayProxy.rawArray).not.toBe(originalArray);
          expect(arrayProxy.rawArray).toEqual(originalArray);
          expect(arrayProxy.length).toEqual(3);
          expect(
            castTo<{ childArray: string[] }>(arrayProxy).childArray,
          ).toEqual([]);
        });
      });
    });
    describe('when the childArray has been proxied before', () => {
      describe('and it is not frozen', () => {
        beforeEach(() => {
          originalArray = ['1', '2', '3'];
          arrayProxy = new ArrayProxy<object, SmartNgRXRowBase>(
            originalArray,
            { ids: [], entities: {} },
            childDefinition,
          );
          arrayProxy.init();
          arrayProxy = new ArrayProxy<object, SmartNgRXRowBase>(
            arrayProxy,
            { ids: [], entities: {} },
            childDefinition,
          );
        });
        it('should set the rawArray to the childArray and set the childArray to an empty array', () => {
          assertArrayProxy(!!arrayProxy);
          arrayProxy.init();
          // make sure rawArray is the same object as the original array
          expect(arrayProxy.rawArray).toBe(originalArray);
          expect(arrayProxy.length).toEqual(3);
          expect(
            castTo<{ childArray: string[] }>(arrayProxy).childArray,
          ).toEqual([]);
        });
      });
    });
  });
  describe('getAtIndex()', () => {
    describe('when the index is between 0 and the length of the array', () => {
      beforeEach(() => {
        originalArray = ['1', '2', '3'];
        arrayProxy = new ArrayProxy<object, SmartNgRXRowBase>(
          originalArray,
          { ids: [], entities: {} },
          childDefinition,
        );
        arrayProxy.init();
        arrayProxy.getAtIndex(0);
        arrayProxy.getAtIndex(1);
        arrayProxy.getAtIndex(2);
      });
      it('should call getArrayItem', () => {
        assertArrayProxy(!!arrayProxy);
        expect(getArrayItemSpy).toHaveBeenCalledTimes(3);
      });
    });
    describe('when the index is negative', () => {
      beforeEach(() => {
        originalArray = ['1', '2', '3'];
        arrayProxy = new ArrayProxy<object, SmartNgRXRowBase>(
          originalArray,
          { ids: [], entities: {} },
          childDefinition,
        );
        arrayProxy.init();
      });
      it('should throw exception', () => {
        expect(() => {
          assertArrayProxy(!!arrayProxy);
          arrayProxy.getAtIndex(-1);
        }).toThrow('Index out of bounds');
      });
    });
    describe('when the index is length or greater', () => {
      beforeEach(() => {
        originalArray = ['1', '2', '3'];
        arrayProxy = new ArrayProxy<object, SmartNgRXRowBase>(
          originalArray,
          { ids: [], entities: {} },
          childDefinition,
        );
        arrayProxy.init();
      });
      it('should throw exception', () => {
        expect(() => {
          assertArrayProxy(!!arrayProxy);
          arrayProxy.getAtIndex(originalArray.length);
        }).toThrow('Index out of bounds');
      });
    });
  });
  describe('createNewParentFromParent()', () => {
    describe('when parent is not a RowProxy', () => {
      beforeEach(() => {
        originalArray = ['1', '2', '3'];
        arrayProxy = new ArrayProxy<object, SmartNgRXRowBase>(
          originalArray,
          { ids: [], entities: {} },
          childDefinition,
        );
        arrayProxy.init();
      });
      it('should return a new parent based on the object passed in', () => {
        assertArrayProxy(!!arrayProxy);
        const parent = {
          id: '1',
          name: 'foo',
          isEditing: false,
          isDirty: false,
        };
        const newParent = castTo<{
          createNewParentFromParent(p: object, b: boolean): object;
        }>(arrayProxy).createNewParentFromParent(parent, true);
        expect(newParent).toEqual({
          id: '1',
          name: 'foo',
          isEditing: true,
          isDirty: false,
        });
      });
    });
    describe('when parent is a RowProxy', () => {
      beforeEach(() => {
        originalArray = ['1', '2', '3'];
        arrayProxy = new ArrayProxy<object, SmartNgRXRowBase>(
          originalArray,
          { ids: [], entities: {} },
          childDefinition,
        );
        arrayProxy.init();
      });
      it('should return a new parent based on the object passed in', () => {
        assertArrayProxy(!!arrayProxy);
        const parent = {
          id: '1',
          name: 'foo',
          isEditing: false,
          isDirty: false,
        };
        const parentProxy = new RowProxy(
          parent,
          {} as unknown as ActionService<typeof parent>,
          {} as unknown as ActionService<SmartNgRXRowBase>,
        );
        const newParent = castTo<{
          createNewParentFromParent(p: object, b: boolean): object;
        }>(arrayProxy).createNewParentFromParent(parentProxy, true);
        expect(newParent).toEqual({
          id: '1',
          name: 'foo',
          isEditing: true,
          isDirty: false,
        });
      });
    });
  });
});
