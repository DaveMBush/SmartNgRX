import { ActionService } from '../actions/action.service';
import { ArrayProxy } from '../selector/array-proxy.class';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { CustomProxy } from './custom-proxy.class';

interface CRow extends SmartNgRXRowBase {
  id: string;
  name: string;
}

interface TRow extends SmartNgRXRowBase {
  id: string;
  name: string;
  children: ArrayProxy<object, CRow>;
}

describe('CustomProxy', () => {
  let customProxy: CustomProxy<TRow, CRow> | undefined;
  beforeEach(() => {
    const row = {
      id: '1',
      name: 'test',
      children: ['child1a', 'child2a'] as unknown as ArrayProxy<object, CRow>,
    };
    row.children.rawArray = ['child1', 'child2'];
    customProxy = new CustomProxy<TRow, CRow>(
      row as unknown as TRow,
      {} as ActionService<TRow>,
      {} as ActionService<CRow>,
    );
  });
  describe('getRealRow()', () => {
    describe('when one of the fields is an array', () => {
      it('should return the elements from the rawArray', () => {
        expect(customProxy?.getRealRow().children).toEqual([
          'child1',
          'child2',
        ]);
      });
    });
  });
});
