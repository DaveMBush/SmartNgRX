import { FacadeBase } from '../facades/facade.base';
import { ParentInfo } from '../types/parent-info.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { facadeRegistry } from './facade-registry.class';

describe('FacadeRegistry', () => {
  // Setup mocks
  class MockFacadeBase extends FacadeBase {
    init(): boolean {
      return true;
    }

    markDirty(): void {
      /* noop */
    }

    markNotDirty(): void {
      /* noop */
    }

    forceDirty(): void {
      /* noop */
    }

    garbageCollect(): void {
      /* noop */
    }

    remove(): void {
      /* noop */
    }

    update(): void {
      /* noop */
    }

    updateMany(): void {
      /* noop */
    }

    loadByIds(): void {
      /* noop */
    }

    loadByIdsPreload(): void {
      /* noop */
    }

    loadByIdsSuccess(): void {
      /* noop */
    }

    loadByIndexes(): void {
      /* noop */
    }

    loadByIndexesSuccess(): void {
      /* noop */
    }

    upsertRow(): void {
      /* noop */
    }

    removeFromParents(): ParentInfo[] {
      return [] as ParentInfo[];
    }
  }

  // Mock constructor with spies
  class MockFacadeConstructor extends MockFacadeBase {
    static readonly initSpy = jest.fn().mockReturnValue(true);

    override init(): boolean {
      return MockFacadeConstructor.initSpy() as boolean;
    }
  }

  // Reset before each test
  beforeEach(() => {
    facadeRegistry.clear();
    MockFacadeConstructor.initSpy.mockClear();
  });

  describe('register', () => {
    it('should store the constructor when provided and return empty object', () => {
      // Arrange
      const feature = 'testFeature';
      const entity = 'testEntity';

      // Act
      const result = facadeRegistry.register(
        feature,
        entity,
        MockFacadeConstructor,
      );

      // Assert
      expect(result).toEqual({});
      expect(facadeRegistry.hasFacade(feature, entity)).toBe(false);
    });

    it('should create a new facade when registering without constructor', () => {
      // Arrange
      const feature = 'testFeature';
      const entity = 'testEntity';

      // Register constructor first
      facadeRegistry.register(feature, entity, MockFacadeConstructor);

      // Act
      const result = facadeRegistry.register<SmartNgRXRowBase>(feature, entity);

      // Assert
      expect(result).toBeInstanceOf(MockFacadeConstructor);
      expect(MockFacadeConstructor.initSpy).toHaveBeenCalledTimes(1);
      expect(facadeRegistry.hasFacade(feature, entity)).toBe(true);
    });

    it('should return existing facade if already created', () => {
      // Arrange
      const feature = 'testFeature';
      const entity = 'testEntity';

      // Register constructor and create facade
      facadeRegistry.register(feature, entity, MockFacadeConstructor);
      const firstRegister = facadeRegistry.register<SmartNgRXRowBase>(
        feature,
        entity,
      );

      // Act - register again
      const secondRegister = facadeRegistry.register<SmartNgRXRowBase>(
        feature,
        entity,
      );

      // Assert
      expect(secondRegister).toBe(firstRegister);
      expect(MockFacadeConstructor.initSpy).toHaveBeenCalledTimes(1);
    });

    it('should throw error when facade constructor is not found', () => {
      // Arrange
      const feature = 'testFeature';
      const entity = 'testEntity';

      // Act & Assert
      expect(() => {
        facadeRegistry.register<SmartNgRXRowBase>(feature, entity);
      }).toThrow('facadeConstructor is required here');
    });

    it('should throw error if init returns false', () => {
      // Arrange
      const feature = 'testFeature';
      const entity = 'testEntity';
      MockFacadeConstructor.initSpy.mockReturnValueOnce(false);

      // Act & Assert
      expect(() => {
        facadeRegistry.register(feature, entity, MockFacadeConstructor);
        facadeRegistry.register<SmartNgRXRowBase>(feature, entity);
      }).toThrow('ActionService init failed');
    });
  });

  describe('hasFacade', () => {
    it('should return true if facade exists', () => {
      // Arrange
      const feature = 'testFeature';
      const entity = 'testEntity';

      // Register and create facade
      facadeRegistry.register(feature, entity, MockFacadeConstructor);
      facadeRegistry.register<SmartNgRXRowBase>(feature, entity);

      // Act & Assert
      expect(facadeRegistry.hasFacade(feature, entity)).toBe(true);
    });

    it('should return false if facade does not exist', () => {
      // Arrange
      const feature = 'testFeature';
      const entity = 'testEntity';

      // Act & Assert
      expect(facadeRegistry.hasFacade(feature, entity)).toBe(false);
    });

    it('should return false if only constructor is registered but facade not created', () => {
      // Arrange
      const feature = 'testFeature';
      const entity = 'testEntity';

      // Register constructor only
      facadeRegistry.register(feature, entity, MockFacadeConstructor);

      // Act & Assert
      expect(facadeRegistry.hasFacade(feature, entity)).toBe(false);
    });
  });

  describe('clear', () => {
    it('should clear all registered facades', () => {
      // Arrange
      const feature1 = 'testFeature1';
      const entity1 = 'testEntity1';
      const feature2 = 'testFeature2';
      const entity2 = 'testEntity2';

      // Register and create facades
      facadeRegistry.register(feature1, entity1, MockFacadeConstructor);
      facadeRegistry.register<SmartNgRXRowBase>(feature1, entity1);
      facadeRegistry.register(feature2, entity2, MockFacadeConstructor);
      facadeRegistry.register<SmartNgRXRowBase>(feature2, entity2);

      // Verify facades exist
      expect(facadeRegistry.hasFacade(feature1, entity1)).toBe(true);
      expect(facadeRegistry.hasFacade(feature2, entity2)).toBe(true);

      // Act
      facadeRegistry.clear();

      // Assert
      expect(facadeRegistry.hasFacade(feature1, entity1)).toBe(false);
      expect(facadeRegistry.hasFacade(feature2, entity2)).toBe(false);
    });
  });
});
