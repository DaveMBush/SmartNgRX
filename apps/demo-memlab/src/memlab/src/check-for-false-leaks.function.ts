import { run } from '@memlab/api';
import { IScenario } from '@memlab/core';
import * as fs from 'fs';
import * as memlab from 'memlab';

import { abortIfLeakCountsAreNotEqual } from './abort-if-leak-counts-are-not-equal.function';
import { LeakErrors } from './leak-errors.interface';
import { LeakFileTrace } from './leak-file-trace.interface';
import { LeakItem } from './leak-item.interface';
import { refineLeak } from './refine-leak';

// eslint-disable-next-line max-params-no-constructor/max-params-no-constructor -- not worth fixing at this time
export async function checkForFalseLeaks(
  leaks: LeakItem[],
  traceDir: string,
  runResult: memlab.BrowserInteractionResultReader,
  scenario: IScenario,
  skipWarmup: boolean,
  workDir: string,
  errors: Map<string, LeakErrors>,
  s: IScenario & { name: string },
): Promise<memlab.BrowserInteractionResultReader> {
  if (leaks.length > 0) {
    console.log(`  Leaks found. Checking for false leaks.`);
    const leakItems: LeakItem[] = [];
    fs.readdirSync(traceDir).forEach((file) => {
      const json = JSON.parse(
        fs.readFileSync(traceDir + '/' + file, 'utf8'),
      ) as LeakFileTrace;
      const numDuplicates = json.num_duplicates;
      const leakTraceSummary = json.leak_trace_summary;
      leakItems.push({ numDuplicates, leakTraceSummary });
    });
    runResult.cleanup();
    scenario.repeat = () => 2;
    const result = await run({
      scenario,
      skipWarmup,
      workDir,
    });
    runResult = result.runResult;

    abortIfLeakCountsAreNotEqual(result, leakItems, runResult);

    fs.readdirSync(traceDir).forEach((file) => {
      const json = JSON.parse(
        fs.readFileSync(traceDir + '/' + file, 'utf8'),
      ) as LeakFileTrace;
      const duplicatePlusOrMinus = Math.ceil(json.num_duplicates * 0.03);
      const upper = json.num_duplicates + duplicatePlusOrMinus;
      const lower = json.num_duplicates - duplicatePlusOrMinus;
      let foundLeak = leaks.filter(
        (l) => lower <= l.numDuplicates && l.numDuplicates <= upper,
      );
      if (foundLeak.length > 1) {
        const refinedLeak = refineLeak(json.leak_trace_summary, foundLeak);
        if (refinedLeak) {
          foundLeak = [refinedLeak];
        } else {
          console.log(
            `  Found more than one possible matches for one of the leak traces.`,
          );
        }
      }
      if (foundLeak.length === 1) {
        foundLeak[0].numDuplicates = 0;
      }
    });
    errors.set(s.name, {
      scenario,
      leakCount: leaks.filter((l) => l.numDuplicates > 0).length,
      leaks,
    });
  }
  return runResult;
}
