import { EntityState } from '@ngrx/entity';

import { defaultRows } from './default-rows.function';

describe('default-rows.function.ts', () => {
  const defaultRow = (id: string) => ({ id, isDirty: false });
  let returnedRows = [];
  describe('when I pass an ID that is not in state', () => {
    it('should return a row with the id', () => {
      const ids = ['1'];
      const state: EntityState<{ id: string; isDirty: boolean }> = {
        ids: [],
        entities: {},
      };
      returnedRows = defaultRows(ids, state, defaultRow);
      expect(returnedRows).toEqual([{ id: '1', isDirty: false }]);
    });
  });
  describe('when I pass an ID that is in state', () => {
    it('should return an empty array', () => {
      const ids = ['1'];
      const state: EntityState<{ id: string; isDirty: boolean }> = {
        ids: ['1'],
        entities: {
          '1': { id: '1', isDirty: false },
        },
      };
      returnedRows = defaultRows(ids, state, defaultRow);
      expect(returnedRows).toEqual([]);
    });
  });
  describe('when I pass a mixture of IDs in and out of state', () => {
    it('should return an empty array', () => {
      const ids = ['1', '2', '3', '4', '5', '6'];
      const state: EntityState<{ id: string; isDirty: boolean }> = {
        ids: ['1', '3', '4'],
        entities: {
          '1': { id: '1', isDirty: false },
          '3': { id: '3', isDirty: false },
          '4': { id: '4', isDirty: false },
        },
      };
      returnedRows = defaultRows(ids, state, defaultRow);
      expect(returnedRows).toEqual([
        { id: '2', isDirty: false },
        { id: '5', isDirty: false },
        { id: '6', isDirty: false },
      ]);
    });
  });
});
