import { Update } from '@ngrx/entity';
import { SmartNgRXRowBase } from '../../types/smart-ngrx-row-base.interface';
import { SignalsFacade } from '../signals-facade';
import { entitySignalStoreFactory } from './entity-signal-store.factory';

// Define test interface
interface TestRow extends SmartNgRXRowBase {
  name: string;
  value: number;
}

describe('entitySignalStoreFactory', () => {
  // Test data
  const testRow1: TestRow = {
    id: '1',
    name: 'Test 1',
    value: 100,
  };

  const testRow2: TestRow = {
    id: '2',
    name: 'Test 2',
    value: 200,
  };

  let store: ReturnType<typeof entitySignalStoreFactory<TestRow>>;
  let facade: Partial<SignalsFacade<TestRow>>;

  beforeEach(() => {
    // Create a partial implementation of SignalsFacade with just what we need
    facade = {
      selectId: (row: TestRow) => row.id,
      feature: 'test',
      entity: 'testEntity',
    };

    // Create the actual store
    store = entitySignalStoreFactory<TestRow>(facade as SignalsFacade<TestRow>);
  });

  describe('upsert method', () => {
    it('should update when entity exists and add when it does not', () => {
      // First add a new entity
      store.upsert(testRow1);

      // Should have the entity in the store
      expect(store.ids()).toContain('1');
      expect(store.entityMap()['1']).toEqual(testRow1);

      // Now update the same entity
      const updatedRow = { ...testRow1, value: 150 };
      store.upsert(updatedRow);

      // Should have updated the entity
      expect(store.ids()).toContain('1');
      expect(store.entityMap()['1']).toEqual(updatedRow);
      expect(store.entityMap()['1'].value).toBe(150);

      // Now add another entity
      store.upsert(testRow2);

      // Should have both entities
      expect(store.ids()).toContain('1');
      expect(store.ids()).toContain('2');
      expect(store.ids().length).toBe(2);
    });
  });

  describe('updateMany', () => {
    it('should update multiple entities', () => {
      // Add initial entities
      store.upsert(testRow1);
      store.upsert(testRow2);

      // Update multiple entities
      const changes: Update<TestRow>[] = [
        { id: '1', changes: { value: 150 } },
        { id: '2', changes: { value: 250 } },
      ];

      store.updateMany(changes);

      // Check updates applied correctly
      expect(store.entityMap()['1'].value).toBe(150);
      expect(store.entityMap()['2'].value).toBe(250);
    });
  });

  describe('remove', () => {
    it('should remove entities by ids', () => {
      // Add initial entities
      store.upsert(testRow1);
      store.upsert(testRow2);

      // Ensure both entities are there
      expect(store.ids().length).toBe(2);

      // Remove one entity
      store.remove(['1']);

      // Check entity was removed
      expect(store.ids().length).toBe(1);
      expect(store.ids()).not.toContain('1');
      expect(store.ids()).toContain('2');

      // Remove another entity
      store.remove(['2']);

      // Check all entities removed
      expect(store.ids().length).toBe(0);
    });
  });

  describe('storeRows', () => {
    it('should upsert multiple rows', () => {
      // Store multiple rows
      const rows = [testRow1, testRow2];
      store.storeRows(rows);

      // Check all rows were added
      expect(store.ids().length).toBe(2);
      expect(store.ids()).toContain('1');
      expect(store.ids()).toContain('2');
      expect(store.entityMap()['1']).toEqual(testRow1);
      expect(store.entityMap()['2']).toEqual(testRow2);

      // Update rows
      const updatedRows = [
        { ...testRow1, value: 150 },
        { ...testRow2, value: 250 },
      ];

      store.storeRows(updatedRows);

      // Check updates were applied
      expect(store.entityMap()['1'].value).toBe(150);
      expect(store.entityMap()['2'].value).toBe(250);
    });
  });

  describe('entityState', () => {
    it('should return the current entity state', () => {
      // Add entities
      store.upsert(testRow1);
      store.upsert(testRow2);

      // Get entity state
      const state = store.entityState();

      // Check state structure
      expect(state.ids).toEqual(['1', '2']);
      expect(state.entities).toEqual({
        '1': testRow1,
        '2': testRow2,
      });
    });
  });
});
