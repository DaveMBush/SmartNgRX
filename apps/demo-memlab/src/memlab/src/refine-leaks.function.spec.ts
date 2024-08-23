import * as run from '@memlab/api';
import { IScenario } from '@memlab/core';

import * as abortIfLeakCountsAreNotEqual from './abort-if-leak-counts-are-not-equal.function';
import { LeakErrors } from './leak-errors.interface';
import { LeakItem } from './leak-item.interface';
import * as parseTraceFiles from './parse-trace-files.function';
import * as refineLeak from './refine-leak.function';
import { refineLeaks } from './refine-leaks.function';

// mock memlab.run
jest.mock('@memlab/api', () => {
  return {
    ...jest.requireActual('@memlab/api'),
    run: jest.fn(),
  } as typeof jest;
});

describe('refineLeaks()', () => {
  let parseTraceReturn: LeakItem[] = [];
  let leaksItems: LeakItem[] = [];
  let errors: Map<string, LeakErrors> = new Map();
  let refineLeakReturnValue: LeakItem | null = null;
  beforeEach(() => {
    jest.spyOn(run, 'run').mockImplementation(async (_?: run.RunOptions) => {
      return Promise.resolve({
        runResult: {},
      } as run.RunResult);
    });
    // mock abortIfLeakCountsAreNotEqual
    jest
      .spyOn(abortIfLeakCountsAreNotEqual, 'abortIfLeakCountsAreNotEqual')
      .mockImplementation(() => {
        /**  */
      });
    // mock parseTraceFiles
    jest
      .spyOn(parseTraceFiles, 'parseTraceFiles')
      .mockImplementation(() => parseTraceReturn);
    // mock refineLeak
    jest
      .spyOn(refineLeak, 'refineLeak')
      .mockImplementation(() => refineLeakReturnValue);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe('when parseTraceFiles returns an empty array', () => {
    beforeEach(() => {
      parseTraceReturn = [];
      leaksItems = [];
      errors = new Map();
    });
    it('should return the same runResult that it started with', async () => {
      await expect(
        refineLeaks(
          { name: 'foo' } as IScenario & { name: string },
          leaksItems,
          errors,
        ),
      ).resolves.toStrictEqual({});
      expect(errors.get('foo')?.leakCount).toBe(0);
    });
  });
  describe('leakItems has one of the items that matches the results of parseTraceFiles', () => {
    beforeEach(() => {
      parseTraceReturn = [
        {
          leakTraceSummary: 'foo',
          numDuplicates: 95,
        },
      ];
      leaksItems = [
        { leakTraceSummary: 'foo', numDuplicates: 112 },
        { leakTraceSummary: 'foo', numDuplicates: 96 },
      ];
      errors = new Map();
    });
    it('The leakCount for the scenario should be 1', async () => {
      await expect(
        refineLeaks(
          { name: 'foo' } as IScenario & { name: string },
          leaksItems,
          errors,
        ),
      ).resolves.toStrictEqual({});
      expect(errors.get('foo')?.leakCount).toBe(1);
    });
  });
  describe('leakItems has more than one of the items that matches the results of parseTraceFiles', () => {
    beforeEach(() => {
      parseTraceReturn = [
        {
          leakTraceSummary: 'foo',
          numDuplicates: 95,
        },
      ];
      leaksItems = [
        { leakTraceSummary: 'foo', numDuplicates: 95 },
        { leakTraceSummary: 'foo', numDuplicates: 96 },
      ];
      errors = new Map();
    });
    describe("and refineLeak can't find a match", () => {
      it('The leakCount for the scenario should be 2', async () => {
        await expect(
          refineLeaks(
            { name: 'foo' } as IScenario & { name: string },
            leaksItems,
            errors,
          ),
        ).resolves.toStrictEqual({});
        expect(errors.get('foo')?.leakCount).toBe(2);
      });
    });
    describe('and refineLeak can find a match', () => {
      beforeEach(() => {
        refineLeakReturnValue = leaksItems[1];
      });
      it('The leakCount for the scenario should be 1', async () => {
        await expect(
          refineLeaks(
            { name: 'foo' } as IScenario & { name: string },
            leaksItems,
            errors,
          ),
        ).resolves.toStrictEqual({});
        expect(errors.get('foo')?.leakCount).toBe(1);
      });
    });
  });
});
