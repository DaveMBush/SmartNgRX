import { workDirectory } from './work-directory.function';

export function traceDirectory(): string {
  return workDirectory() + '/data/logger/trace-clusters';
}
