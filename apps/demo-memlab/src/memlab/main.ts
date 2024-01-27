import * as memlab from 'memlab';
import { scenario as demoStandard } from './demo/base-line-to-standard';
import { scenario as demoNoRefresh } from './demo/base-line-to-no-refresh';
import { scenario as demoNoRemove } from './demo/base-line-to-no-remove';
import { scenario as demoNoDirty } from './demo/base-line-to-no-dirty';
import { scenario as editRowOnStandard } from './demo/edit-row-on-standard';

(async function () {
  const workDir = '/home/dave/code/SmartNgRX/apps/demo-memlab/work-dir';
  const skipWarmup = true;
  memlab.config.isHeadfulBrowser = true;
  const errors = new Map<string, number>();
  const scenarios = [
    /*demoStandard , demoNoRefresh, demoNoRemove, demoNoDirty,*/ editRowOnStandard,
  ];
  for (const scenario of scenarios) {
    const { leaks, runResult } = await memlab.run({
      scenario,
      skipWarmup,
      workDir,
    });
    if (leaks.length > 0) {
      errors.set(scenario.url(), leaks.length);
    }
    runResult.cleanup();
  }
  if (errors.size > 0) {
    console.log('Errors found:');
    errors.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    process.exit(1);
  } else {
    console.log('No errors found in any scenarios!');
  }
})();
