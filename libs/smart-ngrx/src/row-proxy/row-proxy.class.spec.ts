import { FacadeBase } from '../../../smart-core/src/facades/facade.base';
import { ArrayProxy } from '../smart-selector/array-proxy.class';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { RowProxy } from './row-proxy.class';

interface CRow extends SmartNgRXRowBase {
  id: string;
  name: string;
}

interface TRow extends SmartNgRXRowBase {
  id: string;
  name: string;
  children: ArrayProxy<SmartNgRXRowBase, CRow>;
}

describe('RowProxy', () => {
  let customProxy: RowProxy<TRow> | undefined;
  beforeEach(() => {
    const row = {
      id: '1',
      name: 'test',
      children: ['child1a', 'child2a'] as unknown as ArrayProxy<
        SmartNgRXRowBase,
        CRow
      >,
    };
    row.children.rawArray = ['child1', 'child2'];
    customProxy = new RowProxy<TRow>(
      row as unknown as TRow,
      {} as FacadeBase<TRow>,
      {} as FacadeBase,
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
