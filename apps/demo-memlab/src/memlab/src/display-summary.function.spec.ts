import { displaySummary } from './display-summary.function';
import * as displayTrace from './display-trace.function';
import { LeakErrors } from './leak-errors.interface';

describe('displaySummary', () => {
  const errors: Map<string, LeakErrors> = new Map();
  let displayTraceSpy: jest.SpyInstance;
  let exitSpy: jest.SpyInstance;
  beforeEach(() => {
    displayTraceSpy = jest
      .spyOn(displayTrace, 'displayTrace')
      .mockImplementation(() => {
        /* noop */
      });
    exitSpy = jest
      .spyOn(process, 'exit')
      .mockImplementation((_?: number): never => undefined as never);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('when all the errors have a leakCount of 0', () => {
    beforeEach(() => {
      errors.set('foo', { leakCount: 0 } as LeakErrors);
      errors.set('bar', { leakCount: 0 } as LeakErrors);
    });
    it('should not display any errors', () => {
      displaySummary(errors);
      expect(displayTraceSpy).not.toHaveBeenCalled();
      expect(exitSpy).not.toHaveBeenCalled();
    });
  });
  describe('when one error has a leakCount === 2', () => {
    beforeEach(() => {
      errors.set('foo', { leakCount: 0 } as LeakErrors);
      errors.set('bar', {
        leakCount: 2,
        leaks: [{ leakTraceSummary: 'foo' }],
      } as LeakErrors);
    });
    it('should display the errors', () => {
      displaySummary(errors);
      expect(displayTraceSpy).toHaveBeenCalledTimes(1);
      expect(exitSpy).toHaveBeenCalled();
    });
  });
});
