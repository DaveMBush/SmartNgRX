import { computed, Signal } from '@angular/core';
import { EntityMap } from '@ngrx/signals/entities';

import { newRowRegistry } from '../../smart-selector/new-row-registry.class';
import { PartialArrayDefinition } from '../../types/partial-array-definition.interface';
import { SmartNgRXRowBase } from '../../types/smart-ngrx-row-base.interface';
import { VirtualArrayContents } from '../../types/virtual-array-contents.interface';
import { SignalsFacade } from '../signals-facade';
import { LoadByIndexesSignals } from './load-by-indexes-signals.class';

// Define test interfaces
interface TestRow extends SmartNgRXRowBase {
  children?: VirtualArrayContents;
}

// Define type-safe interfaces for our mocks
interface MockFacade {
  feature: string;
  entity: string;
  storeRows: jest.Mock;
  entityState: {
    entityMap: jest.Mock;
    entityState: Signal<{ ids: string[]; entities: EntityMap<TestRow> }>;
  };
}

describe('LoadByIndexesSignals', () => {
  let loadByIndexesSignals: LoadByIndexesSignals<TestRow>;
  let mockFacade: MockFacade;
  let storeRowsSpy: jest.SpyInstance;
  const feature = 'testFeature';
  const entity = 'testEntity';

  beforeEach(() => {
    // Create mock for facade and its entityState
    mockFacade = {
      feature,
      entity,
      storeRows: jest.fn(),
      entityState: {
        entityMap: jest.fn().mockReturnValue({}),
        entityState: computed(() => ({
          ids: [],
          entities: {},
        })),
      },
    };

    storeRowsSpy = jest.spyOn(mockFacade, 'storeRows');
    loadByIndexesSignals = new LoadByIndexesSignals(
      mockFacade as unknown as SignalsFacade<TestRow>,
    );
    loadByIndexesSignals.init();
  });

  describe('loadByIndexesSuccess', () => {
    it('should handle new row at the end of the array', () => {
      const parentId = 'parent1';
      const childField = 'children';
      const lastId = 'lastId';
      const array: PartialArrayDefinition = {
        startIndex: 0,
        indexes: ['id1', 'id2', lastId],
        length: 3,
      };

      // Register the last ID as a new row
      newRowRegistry.registerNewRow(feature, entity, lastId);

      const field: VirtualArrayContents = {
        indexes: ['id1', 'id2', lastId],
        length: 3,
      };

      const row: TestRow = {
        id: parentId,
        [childField]: field,
      };

      mockFacade.entityState.entityState = computed(() => ({
        ids: [parentId],
        entities: { [parentId]: row },
      }));

      loadByIndexesSignals.loadByIndexesSuccess(parentId, childField, array);

      expect(storeRowsSpy).toHaveBeenCalledWith([
        {
          id: parentId,
          [childField]: {
            indexes: ['id1', 'id2', lastId, lastId],
            length: 4,
          },
        },
      ]);
    });

    it('should not modify array when there is no new row at the end', () => {
      const parentId = 'parent1';
      const childField = 'children';
      const array: PartialArrayDefinition = {
        startIndex: 0,
        indexes: ['id1', 'id2', 'id3'],
        length: 3,
      };

      const field: VirtualArrayContents = {
        indexes: ['id1', 'id2', 'id3'],
        length: 3,
      };

      const row: TestRow = {
        id: parentId,
        [childField]: field,
      };

      mockFacade.entityState.entityState = computed(() => ({
        ids: [parentId],
        entities: { [parentId]: row },
      }));

      loadByIndexesSignals.loadByIndexesSuccess(parentId, childField, array);

      expect(storeRowsSpy).toHaveBeenCalledWith([
        {
          id: parentId,
          [childField]: {
            indexes: ['id1', 'id2', 'id3'],
            length: 3,
          },
        },
      ]);
    });

    it('should not modify array when indexes array is empty', () => {
      const parentId = 'parent1';
      const childField = 'children';
      const array: PartialArrayDefinition = {
        startIndex: 0,
        indexes: [],
        length: 0,
      };

      const field: VirtualArrayContents = {
        indexes: [],
        length: 0,
      };

      const row: TestRow = {
        id: parentId,
        [childField]: field,
      };

      mockFacade.entityState.entityState = computed(() => ({
        ids: [parentId],
        entities: { [parentId]: row },
      }));

      loadByIndexesSignals.loadByIndexesSuccess(parentId, childField, array);

      expect(storeRowsSpy).toHaveBeenCalledWith([
        {
          id: parentId,
          [childField]: {
            indexes: [],
            length: 0,
          },
        },
      ]);
    });
  });
});
