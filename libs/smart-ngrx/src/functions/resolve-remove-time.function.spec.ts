import { MarkAndDeleteInit } from '../types/mark-and-delete-init.interface';
import { resolveRemoveTime } from './resolve-remove-time.function';

describe('resolveRemoveTime', () => {
  it('returns the markDirtyTime * 2 if markDirtyTime is greater than removeTime', () => {
    const init: MarkAndDeleteInit = {
      removeTime: 60,
      markDirtyTime: 120,
      markDirtyFetchesNew: true,
      runInterval: 60 * 1000,
    };

    const result = resolveRemoveTime(init);

    expect(result).toEqual(240);
  });

  it('returns original removeTime if markDirtyTime is less than removeTime', () => {
    const init = {
      removeTime: 120,
      markDirtyTime: 119,
      markDirtyFetchesNew: true,
      runInterval: 60 * 1000,
    };

    const result = resolveRemoveTime(init);

    expect(result).toEqual(120);
  });

  it('returns original removeTime if markDirtyTime is -1', () => {
    const init = {
      removeTime: 120,
      markDirtyTime: -1,
      markDirtyFetchesNew: true,
      runInterval: 60 * 1000,
    };

    const result = resolveRemoveTime(init);

    expect(result).toEqual(120);
  });
});
