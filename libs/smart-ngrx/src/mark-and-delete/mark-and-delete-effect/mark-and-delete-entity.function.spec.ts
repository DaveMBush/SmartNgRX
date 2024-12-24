import { psi } from '../../common/psi.const';
import { entityRegistry } from '../../registrations/entity-registry.class';
import { MarkAndDeleteInit } from '../../types/mark-and-delete-init.interface';
import { globalMarkAndDeleteInit } from '../global-mark-and-delete-init.class';
import { markAndDeleteEntity } from './mark-and-delete-entity.function';
import * as processMarkAndDelete from './process-mark-and-delete.function';

let processMarkAndDeleteSpy: jest.SpyInstance;
describe('markAndDeleteEntity', () => {
  beforeEach(() => {
    processMarkAndDeleteSpy = jest
      .spyOn(processMarkAndDelete, 'processMarkAndDelete')
      .mockImplementation(() => {
        return;
      });
  });
  afterEach(() => {
    entityRegistry.unregister('feature', 'entity');
    processMarkAndDeleteSpy.mockRestore();
  });
  describe('when there is nothing to mark dirty or remove', () => {
    it('should not send anything to processMarkAndDelete(...)', () => {
      entityRegistry.register('feature', 'entity', {
        markAndDeleteInit: {
          markDirtyTime: 15 * 60 * 1000,
          removeTime: 30 * 60 * 1000,
          markDirtyFetchesNew: true,
        } as MarkAndDeleteInit & { runInterval?: number },
        markAndDeleteEntityMap: new Map<string, number>(),
        defaultRow: (id) => {
          return {
            id,
          };
        },
      });
      markAndDeleteEntity(['feature', 'entity'] as [string, string]);
      expect(processMarkAndDeleteSpy).toHaveBeenCalledWith(
        'feature',
        'entity',
        [],
        [],
      );
    });
  });
  describe('when there is something to remove but the feature removeTime is 0', () => {
    it('should not send anything to processMarkAndDelete(...)', () => {
      globalMarkAndDeleteInit.register({
        runInterval: 60 * 1000,
        markDirtyTime: 15 * 60 * 1000,
        removeTime: 60 * 60 * 1000,
        markDirtyFetchesNew: true,
      });
      entityRegistry.register('feature', 'entity', {
        markAndDeleteInit: {
          markDirtyTime: 15 * 60 * 1000,
          removeTime: 0,
          markDirtyFetchesNew: true,
        } as MarkAndDeleteInit & { runInterval?: number },
        markAndDeleteEntityMap: new Map<string, number>([
          [`feature${psi}entity`, Date.now() - 30 * 60 * 1000],
        ]),
        defaultRow: (id) => {
          return {
            id,
          };
        },
      });
      markAndDeleteEntity(['feature', 'entity']);
      expect(processMarkAndDeleteSpy).toHaveBeenCalledWith(
        'feature',
        'entity',
        [],
        [],
      );
    });
  });
  describe('when there is something to remove and the removeTime is not 0', () => {
    it('should send the correct data to processMarkAndDelete(...)', () => {
      entityRegistry.register('feature', 'entity', {
        markAndDeleteInit: {
          markDirtyTime: 15 * 60 * 1000,
          removeTime: 20 * 60 * 1000,
          markDirtyFetchesNew: true,
        } as MarkAndDeleteInit & { runInterval?: number },
        markAndDeleteEntityMap: new Map<string, number>([
          [`1`, Date.now() - 30 * 60 * 1000],
        ]),
        defaultRow: (id) => {
          return {
            id,
          };
        },
      });
      markAndDeleteEntity(['feature', 'entity']);
      expect(processMarkAndDeleteSpy).toHaveBeenCalledWith(
        'feature',
        'entity',
        ['1'],
        [],
      );
    });
  });
  describe('when there is something to mark dirty', () => {
    it('should send dirty data to processMarkAndDelete(...)', () => {
      entityRegistry.register('feature', 'entity', {
        markAndDeleteInit: {
          markDirtyTime: 15 * 60 * 1000,
          removeTime: 20 * 60 * 1000,
          markDirtyFetchesNew: true,
        } as MarkAndDeleteInit & { runInterval?: number },
        markAndDeleteEntityMap: new Map<string, number>([
          [`1`, Date.now() - 15 * 60 * 1000 - 1],
        ]),
        defaultRow: (id) => {
          return {
            id,
          };
        },
      });
      markAndDeleteEntity(['feature', 'entity']);
      expect(processMarkAndDeleteSpy).toHaveBeenCalledWith(
        'feature',
        'entity',
        [],
        ['1'],
      );
    });
  });
  describe('when nothing is dirty or removable', () => {
    it('should send dirty data to processMarkAndDelete(...)', () => {
      entityRegistry.register('feature', 'entity', {
        markAndDeleteInit: {
          markDirtyTime: 15 * 60 * 1000,
          removeTime: 20 * 60 * 1000,
          markDirtyFetchesNew: true,
        } as MarkAndDeleteInit & { runInterval?: number },
        markAndDeleteEntityMap: new Map<string, number>([
          [`feature${psi}entity`, Date.now() - 10 * 60 * 1000],
        ]),
        defaultRow: (id) => {
          return {
            id,
          };
        },
      });
      markAndDeleteEntity(['feature', 'entity']);
      expect(processMarkAndDeleteSpy).toHaveBeenCalledWith(
        'feature',
        'entity',
        [],
        [],
      );
    });
  });
});
