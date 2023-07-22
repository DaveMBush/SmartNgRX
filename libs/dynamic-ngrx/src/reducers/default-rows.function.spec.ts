import { EntityState } from '@ngrx/entity';

import { defaultRows } from './default-rows.function';

describe('default-rows.function.ts', () => {
  const defaultRow = (id: string) => ({ id });
  let returnedRows = [];
  describe('when I pass an ID that is not in state', () => {
    it('should return a row with the id', () => {
      const ids = ['1'];
      const state: EntityState<{ id: string }> = {
        ids: [],
        entities: {},
      };
      returnedRows = defaultRows(ids, state, defaultRow);
      expect(returnedRows).toEqual([{ id: '1' }]);
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
      returnedRows = defaultRows(ids, state, defaultRow);
      expect(returnedRows).toEqual([]);
    });
  });
  describe('when I pass a mixture of IDs in and out of state', () => {
    it('should return an empty array', () => {
      const ids = ['1', '2', '3', '4', '5', '6'];
      const state: EntityState<{ id: string }> = {
        ids: ['1','3','4',],
        entities: {
          '1': { id: '1' },
          '3': { id: '3' },
          '4': { id: '4' },
        },
      };
      returnedRows = defaultRows(ids, state, defaultRow);
      expect(returnedRows).toEqual([{ id: '2' }, { id: '5' }, { id: '6'}]);
    });
  });
});
