import { ActionService } from '../actions/action.service';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { CustomProxy } from './custom-proxy.class';
import { customProxySet } from './custom-proxy-set.function';

describe('customProxySet', () => {
  let target: CustomProxy<SmartNgRXRowBase, SmartNgRXRowBase> | undefined;
  let services: {
    service: ActionService<SmartNgRXRowBase>;
    parentService: ActionService<SmartNgRXRowBase>;
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
    } as unknown as CustomProxy<SmartNgRXRowBase, SmartNgRXRowBase>;
    services = {
      service: {
        add: () => {
          /*noop*/
        },
        update: () => {
          /*noop*/
        },
      } as unknown as ActionService<SmartNgRXRowBase>,
      parentService: {} as ActionService<SmartNgRXRowBase>,
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
        customProxySet(target!, 'c', 'd', {
          service: {} as ActionService<SmartNgRXRowBase>,
          parentService: {} as ActionService<SmartNgRXRowBase>,
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
        customProxySet(target!, 'a', 'd', services);
        expect(serviceAddSpy).toHaveBeenCalled();
      });
    });
    describe('when target does not have a parentId', () => {
      it('should update the row', () => {
        customProxySet(target!, 'a', 'd', services);
        expect(serviceAddSpy).not.toHaveBeenCalled();
        expect(serviceUpdateSpy).toHaveBeenCalled();
      });
    });
  });
});
