import * as memlab from 'memlab';
import { exit } from 'process';

import { LeakItem } from './leak-item.interface';

export function abortIfLeakCountsAreNotEqual(
  result: memlab.RunResult,
  leakItems: LeakItem[],
  runResult: memlab.BrowserInteractionResultReader,
): void {
  if (result.leaks.length !== leakItems.length) {
    console.log(
      'Leak count changed after repeat. Unable to proceed with filter. You might be able to run this again to get past this issue.',
    );
    runResult.cleanup();
    exit(1);
  }
}
