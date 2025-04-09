import { Signal } from '@angular/core';
import { EntityMap } from '@ngrx/signals/entities';

import { newRowRegistry } from '../../smart-selector/new-row-registry.class';
import { VirtualArrayContents } from '../../types/virtual-array-contents.interface';
import { SignalsFacade } from '../signals-facade';
import { LoadByIndexesSignals } from './load-by-indexes-signals.class';

describe('LoadByIndexesSignals', () => {
  let loadByIndexesSignals: LoadByIndexesSignals<{ id: string }>;
  let mockFacade: SignalsFacade<{ id: string }>;
  let storeRowsSpy: jest.SpyInstance;
  const feature = 'testFeature';
  const entity = 'testEntity';

  beforeEach(() => {
    mockFacade = {
      feature,
      entity,
      entityState: {
        entityState: () => ({
          entities: {},
          ids: [],
        }),
      },
      storeRows: jest.fn(),
    } as unknown as SignalsFacade<{ id: string }>;
    storeRowsSpy = jest.spyOn(mockFacade, 'storeRows');
    loadByIndexesSignals = new LoadByIndexesSignals(mockFacade);
    loadByIndexesSignals.init();
  });

  describe('loadByIndexesSuccess', () => {
    it('should handle new row at the end of the array', () => {
      const parentId = 'parent1';
      const childField = 'children';
      const lastId = 'lastId';
      const array = {
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

      const row = {
        id: parentId,
        [childField]: field,
      };

      mockFacade.entityState.entityState = (() => ({
        entities: {
          [parentId]: row,
        },
        ids: [parentId],
      })) as unknown as Signal<{
        ids: string[];
        entities: EntityMap<{ id: string }>;
      }>;

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
      const array = {
        startIndex: 0,
        indexes: ['id1', 'id2', 'id3'],
        length: 3,
      };

      const field: VirtualArrayContents = {
        indexes: ['id1', 'id2', 'id3'],
        length: 3,
      };

      const row = {
        id: parentId,
        [childField]: field,
      };

      mockFacade.entityState.entityState = (() => ({
        entities: {
          [parentId]: row,
        },
        ids: [parentId],
      })) as unknown as Signal<{
        ids: string[];
        entities: EntityMap<{ id: string }>;
      }>;

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
      const array = {
        startIndex: 0,
        indexes: [],
        length: 0,
      };

      const field: VirtualArrayContents = {
        indexes: [],
        length: 0,
      };

      const row = {
        id: parentId,
        [childField]: field,
      };

      mockFacade.entityState.entityState = (() => ({
        entities: {
          [parentId]: row,
        },
        ids: [parentId],
      })) as unknown as Signal<{
        ids: string[];
        entities: EntityMap<{ id: string }>;
      }>;

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
