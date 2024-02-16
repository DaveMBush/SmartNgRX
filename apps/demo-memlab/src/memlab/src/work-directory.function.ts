let workDir = '';

export function workDirectory(dir?: string): string {
  /* istanbul ignore next -- trivial*/
  if (dir !== undefined) {
    workDir = dir;
  }
  return workDir;
}
