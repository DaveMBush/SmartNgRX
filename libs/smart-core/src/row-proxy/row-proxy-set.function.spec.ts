import { FacadeBase } from '../facades/facade.base';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { RowProxy } from './row-proxy.class';
import { rowProxySet } from './row-proxy-set.function';

describe('customProxySet', () => {
  let target: RowProxy | undefined;
  let facades: {
    facade: FacadeBase;
    parentFacade: FacadeBase;
  };
  let facadeAddSpy: jest.SpyInstance;
  let facadeUpdateSpy: jest.SpyInstance;
  beforeEach(() => {
    target = {
      changes: {},
      record: {
        a: 'b',
        b: 'c',
      },
      getRealRow: () => ({}) as SmartNgRXRowBase,
    } as unknown as RowProxy;
    facades = {
      facade: {
        add: () => {
          /*noop*/
        },
        update: () => {
          /*noop*/
        },
      } as unknown as FacadeBase,
      parentFacade: {} as FacadeBase,
    };
    facadeAddSpy = jest.spyOn(facades.facade, 'add').mockImplementation(() => {
      /*noop*/
    });
    facadeUpdateSpy = jest
      .spyOn(facades.facade, 'update')
      .mockImplementation(() => {
        /*noop*/
      });
  });
  describe('when prop is not in target.record', () => {
    it('should return false', () => {
      const p = rowProxySet(facades);
      expect(p(target!, 'c', 'd')).toBe(false);
    });
  });
  describe('when prop is in target.record', () => {
    describe('when target has a parentId', () => {
      beforeEach(() => {
        target!.getRealRow = () =>
          ({ parentId: 1 }) as unknown as SmartNgRXRowBase;
      });
      it('should add the new row', () => {
        rowProxySet(facades)(target!, 'a', 'd');
        expect(facadeAddSpy).toHaveBeenCalled();
      });
    });
    describe('when target does not have a parentId', () => {
      it('should update the row', () => {
        rowProxySet(facades)(target!, 'a', 'd');
        expect(facadeAddSpy).not.toHaveBeenCalled();
        expect(facadeUpdateSpy).toHaveBeenCalled();
      });
    });
  });
});
