import { displayTrace } from './display-trace.function';
import { LeakErrors } from './leak-errors.interface';

export function displaySummary(errors: Map<string, LeakErrors>): void {
  if (errors.size > 0) {
    console.log('');
    console.log('Errors found:');
    errors.forEach(displayTrace);
    process.exit(1);
  } else {
    console.log('No errors found in any scenarios!');
  }
}
