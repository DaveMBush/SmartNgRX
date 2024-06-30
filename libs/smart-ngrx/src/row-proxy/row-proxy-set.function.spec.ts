import { ActionService } from '../actions/action.service';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { RowProxy } from './row-proxy.class';
import { rowProxySet } from './row-proxy-set.function';

describe('customProxySet', () => {
  let target: RowProxy | undefined;
  let services: {
    service: ActionService;
    parentService: ActionService;
  };
  let serviceAddSpy: jest.SpyInstance;
  let serviceUpdateSpy: jest.SpyInstance;
  beforeEach(() => {
    target = {
      changes: {},
      record: {
        a: 'b',
        b: 'c',
      },
      getRealRow: () => ({}) as SmartNgRXRowBase,
    } as unknown as RowProxy;
    services = {
      service: {
        add: () => {
          /*noop*/
        },
        update: () => {
          /*noop*/
        },
      } as unknown as ActionService,
      parentService: {} as ActionService,
    };
    serviceAddSpy = jest
      .spyOn(services.service, 'add')
      .mockImplementation(() => {
        /*noop*/
      });
    serviceUpdateSpy = jest
      .spyOn(services.service, 'update')
      .mockImplementation(() => {
        /*noop*/
      });
  });
  describe('when prop is not in target.record', () => {
    it('should return false', () => {
      expect(
        rowProxySet(target!, 'c', 'd', {
          service: {} as ActionService,
          parentService: {} as ActionService,
        }),
      ).toBe(false);
    });
  });
  describe('when prop is in target.record', () => {
    describe('when target has a parentId', () => {
      beforeEach(() => {
        target!.getRealRow = () =>
          ({ parentId: 1 }) as unknown as SmartNgRXRowBase;
      });
      it('should add the new row', () => {
        rowProxySet(target!, 'a', 'd', services);
        expect(serviceAddSpy).toHaveBeenCalled();
      });
    });
    describe('when target does not have a parentId', () => {
      it('should update the row', () => {
        rowProxySet(target!, 'a', 'd', services);
        expect(serviceAddSpy).not.toHaveBeenCalled();
        expect(serviceUpdateSpy).toHaveBeenCalled();
      });
    });
  });
});
