import { SmartNgRXRowBase } from '../../types/smart-ngrx-row-base.interface';
import { manageMaps } from './manage-maps.function';

interface Row extends SmartNgRXRowBase {
  id: string;
  name: string;
}

describe('manage-maps.function.ts', () => {
  const lastRow = new Map<string, Row>();
  const lastRowTimeout = new Map<string, number>();
  let now = Date.now();
  describe('when I add a new row to the maps', () => {
    beforeEach(() => {
      manageMaps(lastRow, lastRowTimeout, {
        old: { row: { id: '1', name: 'foo' } },
        new: { row: { id: '1', name: 'bar' } },
      });
    });
    it('adds the row to the maps', () => {
      expect(lastRow.size).toBe(1);
      expect(lastRow.get('1')).toEqual({
        id: '1',
        name: 'foo',
      });
      expect(lastRowTimeout.size).toBe(1);
    });
  });
  describe('when I add an existing row to the maps', () => {
    beforeEach(() => {
      now = Date.now();
      lastRow.set('1', { id: '1', name: 'foo' });
      lastRowTimeout.set('1', now);
      manageMaps(lastRow, lastRowTimeout, {
        old: { row: { id: '1', name: 'bar' } },
        new: { row: { id: '1', name: 'baz' } },
      });
    });
    it('updates the row in the maps', () => {
      expect(lastRow.size).toBe(1);
      expect(lastRow.get('1')).toEqual({
        id: '1',
        name: 'foo',
      });
      expect(lastRowTimeout.size).toBe(1);
      expect(lastRowTimeout.get('1')).toBe(now);
    });
  });
  describe('when I add an existing row to the maps but it has expired', () => {
    beforeEach(() => {
      lastRow.set('1', { id: '1', name: 'foo' });
      lastRowTimeout.set('1', 1);
      manageMaps(lastRow, lastRowTimeout, {
        old: { row: { id: '1', name: 'bar' } },
        new: { row: { id: '1', name: 'baz' } },
      });
    });
    it('updates the row in the maps', () => {
      expect(lastRow.size).toBe(1);
      expect(lastRow.get('1')).toEqual({
        id: '1',
        name: 'bar',
      });
      expect(lastRowTimeout.size).toBe(1);
      expect(lastRowTimeout.get('1')).not.toBe(1);
    });
  });
});
