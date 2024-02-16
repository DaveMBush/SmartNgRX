import * as memlab from 'memlab';

import { abortIfLeakCountsAreNotEqual } from './abort-if-leak-counts-are-not-equal.function';
import { LeakItem } from './leak-item.interface';

describe('abortIfLeakCountsAreNotEqual', () => {
  const result = {
    leaks: [1, 2, 3], // we are only checking length so this doesn't have to be real results
    runResult: {
      cleanup: (): void => {
        /* noop */
      },
    } as memlab.BrowserInteractionResultReader,
  } as unknown as memlab.RunResult;
  const leakItems: LeakItem[] = [
    { numDuplicates: 1, leakTraceSummary: 'test' },
    { numDuplicates: 1, leakTraceSummary: 'test2' },
  ];
  let exitSpy: jest.SpyInstance;
  beforeEach(() => {
    exitSpy = jest.spyOn(process, 'exit').mockImplementation();
  });
  afterEach(() => {
    exitSpy.mockRestore();
  });
  describe('when result leaks length is not equal to leakItems length', () => {
    it('should log an error and exit the process', () => {
      abortIfLeakCountsAreNotEqual(result, leakItems);

      expect(exitSpy).toHaveBeenCalledWith(1);
    });
  });
  describe('when result leaks length is equal to leakItems length', () => {
    beforeEach(() => {
      result.leaks.pop();
    });
    it('should log an error and exit the process', () => {
      abortIfLeakCountsAreNotEqual(result, leakItems);

      expect(exitSpy).not.toHaveBeenCalledWith(1);
    });
  });
});
