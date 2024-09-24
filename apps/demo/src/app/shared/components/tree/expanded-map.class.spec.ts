import { expandedMap } from './expanded-map.class';

describe('ExpandedMap', () => {
  beforeEach(() => {
    // Clear the expandedMap before each test
    (expandedMap as unknown as { parentLevelMap: Map<string, Map<string, boolean>> }).parentLevelMap.clear();
  });

  describe('hasExpandedChild', () => {
    it('should return false when no map exists for the given key', () => {
      const result = expandedMap.hasExpandedChild('parent1', 1);
      expect(result).toBe(false);
    });

    it('should return false when map exists but is empty', () => {
      expandedMap.set('parent1', 1, 'child1', false);
      expandedMap.delete('parent1', 1, 'child1');
      const result = expandedMap.hasExpandedChild('parent1', 1);
      expect(result).toBe(false);
    });

    it('should return true when map exists and has items', () => {
      expandedMap.set('parent1', 1, 'child1', true);
      const result = expandedMap.hasExpandedChild('parent1', 1);
      expect(result).toBe(true);
    });
  });

  describe('delete', () => {
    it('should not throw when deleting from non-existent map', () => {
      expect(() => {
        expandedMap.delete('nonexistent', 1, 'child1');
      }).not.toThrow();
    });

    it('should not throw when deleting non-existent item from existing map', () => {
      expandedMap.set('parent1', 1, 'child1', true);
      expect(() => {
        expandedMap.delete('parent1', 1, 'nonexistent');
      }).not.toThrow();
    });

    it('should delete item from existing map', () => {
      expandedMap.set('parent1', 1, 'child1', true);
      expandedMap.delete('parent1', 1, 'child1');
      const result = expandedMap.get('parent1', 1, 'child1');
      expect(result).toBe(false);
    });

    it('should not affect other items in the map', () => {
      expandedMap.set('parent1', 1, 'child1', true);
      expandedMap.set('parent1', 1, 'child2', true);
      expandedMap.delete('parent1', 1, 'child1');
      const result1 = expandedMap.get('parent1', 1, 'child1');
      const result2 = expandedMap.get('parent1', 1, 'child2');
      expect(result1).toBe(false);
      expect(result2).toBe(true);
    });
  });
});
