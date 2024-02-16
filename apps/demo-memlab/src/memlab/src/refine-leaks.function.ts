import { run } from '@memlab/api';
import { IScenario } from '@memlab/core';
import * as memlab from 'memlab';

import { abortIfLeakCountsAreNotEqual } from './abort-if-leak-counts-are-not-equal.function';
import { LeakErrors } from './leak-errors.interface';
import { LeakItem } from './leak-item.interface';
import { parseTraceFiles } from './parse-trace-files.function';
import { refineLeak } from './refine-leak.function';
import { skipWarmup } from './skip-warmup.function';
import { workDirectory } from './work-directory.function';

/**
 * For the scenario that was passed in, we try to find the best match in leakItems.
 * If we find one and only one match we set the numDuplicates to 0 so we can
 * filter it out. A match means it has a similar number of duplicates (+/- 3%).
 * If we find more than one match we try to refine the leak by looking at the
 * leak trace summary. If we find a match we set the numDuplicates to 0 so we can
 * filter it out. If we don't find a match we log a message.
 * @param scenario the scenario to rerun
 * @param leakItems the original list of leakItems from the first run
 * @param errors Map of errors we use to keep track of the leaks
 * @returns
 */
export async function refineLeaks(
  scenario: IScenario & { name: string },
  leakItems: LeakItem[],
  errors: Map<string, LeakErrors>,
): Promise<memlab.BrowserInteractionResultReader> {
  const result = await run({
    scenario: {
      action: scenario.action,
      back: scenario.back,
      url: scenario.url,
      setup: scenario.setup,
      repeat: () => 2,
    },
    skipWarmup: skipWarmup(),
    workDir: workDirectory(),
  });

  abortIfLeakCountsAreNotEqual(result, leakItems);

  parseTraceFiles().forEach((li) => {
    const duplicatePlusOrMinus = Math.ceil(li.numDuplicates * 0.03);
    const upper = li.numDuplicates + duplicatePlusOrMinus;
    const lower = li.numDuplicates - duplicatePlusOrMinus;
    let foundLeaks = leakItems.filter(
      (l) => lower <= l.numDuplicates && l.numDuplicates <= upper,
    );
    if (foundLeaks.length > 1) {
      const refinedLeak = refineLeak(li.leakTraceSummary, foundLeaks);
      if (refinedLeak) {
        foundLeaks = [refinedLeak];
      } else {
        console.log(
          `  Found more than one possible matches for one of the leak traces.`,
        );
      }
    }
    if (foundLeaks.length === 1) {
      foundLeaks[0].numDuplicates = 0;
    }
  });
  errors.set(scenario.name, {
    scenario,
    leakCount: leakItems.filter((l) => l.numDuplicates > 0).length,
    leaks: leakItems,
  });
  return result.runResult;
}
