import * as fs from 'fs';

import { LeakFileTrace } from './leak-file-trace.interface';
import { LeakItem } from './leak-item.interface';
import { traceDirectory } from './trace-directory.function';

export function parseTraceFiles(): LeakItem[] {
  const traceDir = traceDirectory();
  const leakItems: LeakItem[] = [];
  fs.readdirSync(traceDir).forEach((file) => {
    const json = JSON.parse(
      fs.readFileSync(traceDir + '/' + file, 'utf8'),
    ) as LeakFileTrace;
    const numDuplicates = json.num_duplicates;
    const leakTraceSummary = json.leak_trace_summary;
    leakItems.push({ numDuplicates, leakTraceSummary });
  });
  return leakItems;
}
