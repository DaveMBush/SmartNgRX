import * as memlab from 'memlab';
import { scenario as demoStandard } from './demo/base-line-to-tree';
import { config } from '@memlab/core';

(async function () {
  const { leaks, runResult } = await memlab.run({ scenario: demoStandard });
  if (leaks.length > 0) {
    console.log(
      runResult.getRunMetaInfo().browserInfo._consoleMessages.join('\n'),
    );
  } else {
    console.log('No leaks detected');
  }
  runResult.cleanup();
})();
