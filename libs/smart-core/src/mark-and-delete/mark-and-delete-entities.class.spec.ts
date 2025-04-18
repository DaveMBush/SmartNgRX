import { psi } from '../common/psi.const';
import { markAndDeleteEntities } from './mark-and-delete-entities.class';

describe('MarkAndDeleteEntities', () => {
  beforeEach(() => {
    // Clear any existing maps
    const entities = markAndDeleteEntities.entities();
    entities.forEach((entity) => {
      const [feature, entityName] = entity.split(psi);
      const map = markAndDeleteEntities.map(feature, entityName);
      map.clear();
    });
  });
  afterEach(() => {
    markAndDeleteEntities.clear();
  });

  describe('map', () => {
    it('should create a new map when one does not exist for the feature/entity pair', () => {
      // Arrange
      const feature = 'testFeature';
      const entity = 'testEntity';

      // Act
      const resultMap = markAndDeleteEntities.map(feature, entity);

      // Assert
      expect(resultMap).toBeInstanceOf(Map);
      expect(resultMap.size).toBe(0);
      expect(markAndDeleteEntities.entities()).toContain(
        `${feature}${psi}${entity}`,
      );
    });

    it('should return the existing map when one exists for the feature/entity pair', () => {
      // Arrange
      const feature = 'testFeature';
      const entity = 'testEntity';
      const testKey = 'testKey';
      const testValue = Date.now();

      // Create the map first
      const map = markAndDeleteEntities.map(feature, entity);
      map.set(testKey, testValue);

      // Act
      const resultMap = markAndDeleteEntities.map(feature, entity);

      // Assert
      expect(resultMap).toBeInstanceOf(Map);
      expect(resultMap.size).toBe(1);
      expect(resultMap.get(testKey)).toBe(testValue);
    });
  });

  describe('entities', () => {
    it('should return all registered feature/entity pairs', () => {
      // Arrange
      const feature1 = 'feature1';
      const entity1 = 'entity1';
      const feature2 = 'feature2';
      const entity2 = 'entity2';

      // Act
      markAndDeleteEntities.map(feature1, entity1);
      markAndDeleteEntities.map(feature2, entity2);
      const entities = markAndDeleteEntities.entities();

      // Assert
      expect(entities).toContain(`${feature1}${psi}${entity1}`);
      expect(entities).toContain(`${feature2}${psi}${entity2}`);
      expect(entities.length).toBe(2);
    });
  });
});
