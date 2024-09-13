import { run } from '@memlab/api';
import * as memlab from 'memlab';

import { scenario as demoNoDirty } from './scenarios/base-line-to-no-dirty';
import { scenario as demoNoRefresh } from './scenarios/base-line-to-no-refresh';
import { scenario as demoNoRemove } from './scenarios/base-line-to-no-remove';
import { scenario as demoStandard } from './scenarios/base-line-to-standard';
import { scenario as editRowOnStandard } from './scenarios/edit-row-on-standard';
import { checkForFalseLeaks } from './src/check-for-false-leaks.function';
import { displaySummary } from './src/display-summary.function';
import { LeakErrors } from './src/leak-errors.interface';
import { skipWarmup } from './src/skip-warmup.function';
import { workDirectory } from './src/work-directory.function';

(async function () {
  workDirectory('/home/dave/code/SmartNgRX/apps/demo-memlab/work-dir');
  skipWarmup(true);
  memlab.config.isHeadfulBrowser = false;
  memlab.config.muteConsole = true;

  const errors = new Map<string, LeakErrors>();
  const scenarios = [
    demoStandard,
    demoNoRefresh,
    demoNoRemove,
    demoNoDirty,
    editRowOnStandard,
  ];
  for (const scenario of scenarios) {
    console.log(`Running scenario: ${scenario.name}`);
    let r: memlab.RunResult;
    try {
      r = await run({
        scenario: {
          action: scenario.action,
          back: scenario.back,
          url: scenario.url,
          setup: scenario.setup,
        },
        skipWarmup: skipWarmup(),
        workDir: workDirectory(),
      });
    } catch (e) {
      console.log(`Error occurred running scenario: ${scenario.name}`);
      console.log(e);
      continue;
    }
    let runResult = r.runResult;
    runResult = await checkForFalseLeaks(runResult, scenario, errors);
    runResult.cleanup();
  }

  displaySummary(errors);
})().catch(() => {
  console.log('Error occurred.');
  process.exit(1);
});
