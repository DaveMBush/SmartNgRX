import { EntityState } from '@ngrx/entity';

import { defaultRows } from '../../../smart-ngrx/src/facades/classic-ngrx.facade/default-rows.function';

describe('default-rows.function.ts', () => {
  const defaultRow = (id: string) => ({ id });
  let returnedRows = [];
  describe('when I pass an ID that is not in state', () => {
    it('should return a row with the id', () => {
      const ids = ['1'];
      const state: EntityState<{
        id: string;
        isDirty: boolean;
      }> = {
        ids: [],
        entities: {},
      };
      returnedRows = defaultRows(ids, state.entities, defaultRow);
      expect(returnedRows).toEqual([{ id: '1', isLoading: true }]);
    });
  });
  describe('when I pass an ID that is in state', () => {
    it('should return an empty array', () => {
      const ids = ['1'];
      const state: EntityState<{ id: string }> = {
        ids: ['1'],
        entities: {
          '1': { id: '1' },
        },
      };
      returnedRows = defaultRows(ids, state.entities, defaultRow);
      expect(returnedRows).toEqual([]);
    });
  });
  describe('when I pass a mixture of IDs in and out of state', () => {
    it('should return an empty array', () => {
      const ids = ['1', '2', '3', '4', '5', '6'];
      const state: EntityState<{ id: string }> = {
        ids: ['1', '3', '4'],
        entities: {
          '1': { id: '1' },
          '3': { id: '3' },
          '4': { id: '4' },
        },
      };
      returnedRows = defaultRows(ids, state.entities, defaultRow);
      expect(returnedRows).toEqual([
        { id: '2', isLoading: true },
        { id: '5', isLoading: true },
        { id: '6', isLoading: true },
      ]);
    });
  });
  describe('if entities is undefined', () => {
    it('all rows should be returned', () => {
      const ids = ['1', '2', '3', '4', '5', '6'];
      returnedRows = defaultRows(ids, undefined, defaultRow);
      expect(returnedRows).toEqual([
        { id: '1', isLoading: true },
        { id: '2', isLoading: true },
        { id: '3', isLoading: true },
        { id: '4', isLoading: true },
        { id: '5', isLoading: true },
        { id: '6', isLoading: true },
      ]);
    });
  });
});
