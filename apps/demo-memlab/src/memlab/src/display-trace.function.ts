import { LeakErrors } from './leak-errors.interface';

export function displayTrace(value: LeakErrors, key: string): void {
  console.log(`  ${key}: ${value.leakCount}`);
  value.leaks.forEach((l) => {
    l.leakTraceSummary.split('\n').forEach((line) => {
      console.log(`  ${line}`);
    });
    console.log('');
  });
}
