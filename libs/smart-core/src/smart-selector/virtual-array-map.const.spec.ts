import { SmartNgRXRowBase } from '@smarttools/core';

import { VirtualArray } from '../../../smart-ngrx/src/smart-selector/virtual-array.class';
import { virtualArrayMap } from './virtual-array-map.const';

interface Clear {
  clear(): void;
}
type VirtualArrayMap = Clear & typeof virtualArrayMap;

const virtualArrayMapProxy = new Proxy(virtualArrayMap, {
  get(target: typeof virtualArrayMap, prop: string) {
    if (prop === 'clear') {
      return () =>
        (
          target as unknown as { entityMap: Map<string, unknown> }
        ).entityMap.clear();
    }
    return (target as unknown as Record<string, unknown>)[prop];
  },
}) as VirtualArrayMap;

describe('VirtualArrayMap', () => {
  let mockVirtualArray: VirtualArray<SmartNgRXRowBase>;

  beforeEach(() => {
    mockVirtualArray = {} as VirtualArray<SmartNgRXRowBase>;
  });
  afterEach(() => {
    virtualArrayMapProxy.clear();
  });

  describe('get method', () => {
    it('should return undefined when feature-entity key does not exist', () => {
      const result = virtualArrayMapProxy.get(
        'nonexistent',
        'entity',
        'id',
        'field',
      );
      expect(result).toBeUndefined();
    });

    it('should return undefined when id does not exist', () => {
      virtualArrayMapProxy.set(
        'feature',
        'entity',
        'existingId',
        'field',
        mockVirtualArray,
      );
      const result = virtualArrayMapProxy.get(
        'feature',
        'entity',
        'nonexistentId',
        'field',
      );
      expect(result).toBeUndefined();
    });

    it('should return undefined when field does not exist', () => {
      virtualArrayMapProxy.set(
        'feature',
        'entity',
        'id',
        'existingField',
        mockVirtualArray,
      );
      const result = virtualArrayMapProxy.get(
        'feature',
        'entity',
        'id',
        'nonexistentField',
      );
      expect(result).toBeUndefined();
    });

    it('should return the VirtualArray when all keys exist', () => {
      virtualArrayMapProxy.set(
        'feature',
        'entity',
        'id',
        'field',
        mockVirtualArray,
      );
      const result = virtualArrayMapProxy.get(
        'feature',
        'entity',
        'id',
        'field',
      );
      expect(result).toBe(mockVirtualArray);
    });
  });

  describe('set method', () => {
    it('should create new maps when feature-entity key does not exist', () => {
      virtualArrayMapProxy.set(
        'newFeature',
        'newEntity',
        'id',
        'field',
        mockVirtualArray,
      );
      const result = virtualArrayMapProxy.get(
        'newFeature',
        'newEntity',
        'id',
        'field',
      );
      expect(result).toBe(mockVirtualArray);
    });

    it('should create new maps when id does not exist', () => {
      virtualArrayMapProxy.set(
        'feature',
        'entity',
        'existingId',
        'field',
        mockVirtualArray,
      );
      virtualArrayMapProxy.set(
        'feature',
        'entity',
        'newId',
        'field',
        mockVirtualArray,
      );
      const result = virtualArrayMapProxy.get(
        'feature',
        'entity',
        'newId',
        'field',
      );
      expect(result).toBe(mockVirtualArray);
    });

    it('should create new map when field does not exist', () => {
      virtualArrayMapProxy.set(
        'feature',
        'entity',
        'id',
        'existingField',
        mockVirtualArray,
      );
      virtualArrayMapProxy.set(
        'feature',
        'entity',
        'id',
        'newField',
        mockVirtualArray,
      );
      const result = virtualArrayMapProxy.get(
        'feature',
        'entity',
        'id',
        'newField',
      );
      expect(result).toBe(mockVirtualArray);
    });

    it('should update existing VirtualArray when all keys exist', () => {
      const initialArray = {} as VirtualArray<SmartNgRXRowBase>;
      virtualArrayMapProxy.set(
        'feature',
        'entity',
        'id',
        'field',
        initialArray,
      );
      virtualArrayMapProxy.set(
        'feature',
        'entity',
        'id',
        'field',
        mockVirtualArray,
      );
      const result = virtualArrayMapProxy.get(
        'feature',
        'entity',
        'id',
        'field',
      );
      expect(result).toBe(mockVirtualArray);
    });
  });

  describe('remove method', () => {
    beforeEach(() => {
      virtualArrayMapProxy.set(
        'feature',
        'entity',
        'id1',
        'field1',
        mockVirtualArray,
      );
      virtualArrayMapProxy.set(
        'feature',
        'entity',
        'id1',
        'field2',
        mockVirtualArray,
      );
      virtualArrayMapProxy.set(
        'feature',
        'entity',
        'id2',
        'field1',
        mockVirtualArray,
      );
    });

    it('should do nothing when feature-entity key does not exist', () => {
      virtualArrayMapProxy.remove('nonexistent', 'entity', 'id1');
      const result = virtualArrayMapProxy.get(
        'feature',
        'entity',
        'id1',
        'field1',
      );
      expect(result).toBe(mockVirtualArray);
    });

    it('should do nothing when id does not exist', () => {
      virtualArrayMapProxy.remove('feature', 'entity', 'nonexistentId');
      const result = virtualArrayMapProxy.get(
        'feature',
        'entity',
        'id1',
        'field1',
      );
      expect(result).toBe(mockVirtualArray);
    });

    it('should remove the id and its fields', () => {
      virtualArrayMapProxy.remove('feature', 'entity', 'id1');
      const result1 = virtualArrayMapProxy.get(
        'feature',
        'entity',
        'id1',
        'field1',
      );
      const result2 = virtualArrayMapProxy.get(
        'feature',
        'entity',
        'id1',
        'field2',
      );
      expect(result1).toBeUndefined();
      expect(result2).toBeUndefined();
    });

    it('should remove the feature-entity key when it becomes empty', () => {
      virtualArrayMapProxy.remove('feature', 'entity', 'id1');
      virtualArrayMapProxy.remove('feature', 'entity', 'id2');
      const result = virtualArrayMapProxy.get(
        'feature',
        'entity',
        'id2',
        'field1',
      );
      expect(result).toBeUndefined();
      expect(
        (
          virtualArrayMapProxy as unknown as { entityMap: Map<string, unknown> }
        ).entityMap.get('feature-entity'),
      ).toBeUndefined();
    });
  });
});
