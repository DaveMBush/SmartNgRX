import { run } from '@memlab/api';
import { IScenario } from '@memlab/core';
import * as memlab from 'memlab';

import { scenario as demoNoDirty } from './scenarios/base-line-to-no-dirty';
import { scenario as demoNoRefresh } from './scenarios/base-line-to-no-refresh';
import { scenario as demoNoRemove } from './scenarios/base-line-to-no-remove';
import { scenario as demoStandard } from './scenarios/base-line-to-standard';
import { scenario as editRowOnStandard } from './scenarios/edit-row-on-standard';
import { checkForFalseLeaks } from './src/check-for-false-leaks.function';
import { displaySummary } from './src/display-summary.function';
import { LeakErrors } from './src/leak-errors.interface';
import { LeakItem } from './src/leak-item.interface';

(async function () {
  const workDir = '/home/dave/code/SmartNgRX/apps/demo-memlab/work-dir';
  const traceDir = workDir + '/data/logger/trace-clusters';
  const skipWarmup = true;
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
  for (const s of scenarios) {
    console.log(`Running scenario: ${s.name}.`);
    const scenario = { ...s } as IScenario;
    delete scenario.name;
    const r = await run({
      scenario,
      skipWarmup,
      workDir,
    });
    const leaks = r.leaks as unknown as LeakItem[];
    let runResult = r.runResult;
    runResult = await checkForFalseLeaks(
      leaks,
      traceDir,
      runResult,
      scenario,
      skipWarmup,
      workDir,
      errors,
      s,
    );
    runResult.cleanup();
  }

  // filter out items with leakCount === 0
  errors.forEach((value, key) => {
    if (value.leakCount === 0) {
      errors.delete(key);
    }
  });

  displaySummary(errors);
})().catch(() => {
  console.log('Error occurred.');
  process.exit(1);
});
