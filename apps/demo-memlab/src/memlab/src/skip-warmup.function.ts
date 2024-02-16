let skipWarmupFlag = true;

export function skipWarmup(flag?: boolean): boolean {
  /* istanbul ignore next -- trivial*/
  if (flag !== undefined) {
    skipWarmupFlag = flag;
  }
  return skipWarmupFlag;
}
