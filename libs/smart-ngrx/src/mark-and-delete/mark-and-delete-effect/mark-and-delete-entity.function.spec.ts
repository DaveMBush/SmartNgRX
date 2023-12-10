import { registerEntity, unregisterEntity } from '../..';
import { castTo } from '../../common/cast-to.function';
import { psi } from '../../common/theta.const';
import { StringLiteralSource } from '../../ngrx-internals/string-literal-source.type';
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
    unregisterEntity('feature', 'entity');
    processMarkAndDeleteSpy.mockRestore();
  });
  describe('when there is nothing to mark dirty or remove', () => {
    it('should not send anything to processMarkAndDelete(...)', () => {
      registerEntity('feature', 'entity', {
        markAndDeleteInit: {
          markDirtyTime: 15 * 60 * 1000,
          removeTime: 30 * 60 * 1000,
        },
        markAndDeleteEntityMap: new Map<string, number>(),
        defaultRow: (id) => {
          return {
            id,
            isDirty: false,
          };
        },
      });
      markAndDeleteEntity(
        castTo<[StringLiteralSource<string>, StringLiteralSource<string>]>([
          'feature',
          'entity',
        ]),
      );
      expect(processMarkAndDeleteSpy).toHaveBeenCalledWith('feature', {}, {});
    });
  });
  describe('when there is something to remove but the feature removeTime is 0', () => {
    it('should not send anything to processMarkAndDelete(...)', () => {
      registerEntity('feature', 'entity', {
        markAndDeleteInit: {
          markDirtyTime: 15 * 60 * 1000,
          removeTime: 0,
        },
        markAndDeleteEntityMap: new Map<string, number>([
          [`feature${psi}entity`, Date.now() - 30 * 60 * 1000],
        ]),
        defaultRow: (id) => {
          return {
            id,
            isDirty: false,
          };
        },
      });
      markAndDeleteEntity(
        castTo<[StringLiteralSource<string>, StringLiteralSource<string>]>([
          'feature',
          'entity',
        ]),
      );
      expect(processMarkAndDeleteSpy).toHaveBeenCalledWith('feature', {}, {});
    });
  });
  describe('when there is something to remove and the removeTime is not 0', () => {
    it('should send the correct data to processMarkAndDelete(...)', () => {
      registerEntity('feature', 'entity', {
        markAndDeleteInit: {
          markDirtyTime: 15 * 60 * 1000,
          removeTime: 20 * 60 * 1000,
        },
        markAndDeleteEntityMap: new Map<string, number>([
          [`feature${psi}entity`, Date.now() - 30 * 60 * 1000],
        ]),
        defaultRow: (id) => {
          return {
            id,
            isDirty: false,
          };
        },
      });
      markAndDeleteEntity(
        castTo<[StringLiteralSource<string>, StringLiteralSource<string>]>([
          'feature',
          'entity',
        ]),
      );
      expect(processMarkAndDeleteSpy).toHaveBeenCalledWith(
        'feature',
        {
          feature: ['entity'],
        },
        {},
      );
    });
  });
  describe('when there is something to mark dirty', () => {
    it('should send dirty data to processMarkAndDelete(...)', () => {
      registerEntity('feature', 'entity', {
        markAndDeleteInit: {
          markDirtyTime: 15 * 60 * 1000,
          removeTime: 20 * 60 * 1000,
        },
        markAndDeleteEntityMap: new Map<string, number>([
          [`feature${psi}entity`, Date.now() - 17 * 60 * 1000],
        ]),
        defaultRow: (id) => {
          return {
            id,
            isDirty: false,
          };
        },
      });
      markAndDeleteEntity(
        castTo<[StringLiteralSource<string>, StringLiteralSource<string>]>([
          'feature',
          'entity',
        ]),
      );
      expect(processMarkAndDeleteSpy).toHaveBeenCalledWith(
        'feature',
        {},
        {
          feature: ['entity'],
        },
      );
    });
  });
  describe('when nothing is dirty or removable', () => {
    it('should send dirty data to processMarkAndDelete(...)', () => {
      registerEntity('feature', 'entity', {
        markAndDeleteInit: {
          markDirtyTime: 15 * 60 * 1000,
          removeTime: 20 * 60 * 1000,
        },
        markAndDeleteEntityMap: new Map<string, number>([
          [`feature${psi}entity`, Date.now() - 10 * 60 * 1000],
        ]),
        defaultRow: (id) => {
          return {
            id,
            isDirty: false,
          };
        },
      });
      markAndDeleteEntity(
        castTo<[StringLiteralSource<string>, StringLiteralSource<string>]>([
          'feature',
          'entity',
        ]),
      );
      expect(processMarkAndDeleteSpy).toHaveBeenCalledWith('feature', {}, {});
    });
  });
});
