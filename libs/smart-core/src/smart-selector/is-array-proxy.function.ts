import { isProxy } from '../common/is-proxy.const';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { BaseArrayProxy } from './base-array-proxy.class';

/**
 * Determines if the specified object is an ArrayProxy
 *
 * @param arr the object to check
 * @returns true if the object is an ArrayProxy
 */
export function isArrayProxy<
  P extends SmartNgRXRowBase,
  C extends SmartNgRXRowBase,
>(arr: unknown): arr is BaseArrayProxy<P, C> {
  // we have to pass in type unknown so the arr is ArrayProxy<P, C>
  // return will work.
  return (arr as Record<keyof BaseArrayProxy<P, C>, boolean>)[isProxy];
}
