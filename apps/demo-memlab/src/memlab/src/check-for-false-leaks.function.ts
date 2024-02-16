import { IScenario, ISerializedInfo } from '@memlab/core';
import * as memlab from 'memlab';

import { LeakErrors } from './leak-errors.interface';
import { LeakItem } from './leak-item.interface';
import { parseTraceFiles } from './parse-trace-files.function';
import { refineLeaks } from './refine-leaks.function';

export async function checkForFalseLeaks(
  runResult: memlab.BrowserInteractionResultReader,
  scenario: IScenario & { name: string },
  errors: Map<string, LeakErrors>,
): Promise<memlab.BrowserInteractionResultReader> {
  console.log(`  Leaks found. Checking for false leaks.`);
  const leakItems: LeakItem[] = parseTraceFiles();
  runResult.cleanup();
  runResult = await refineLeaks(scenario, leakItems, errors);
  return runResult;
}
