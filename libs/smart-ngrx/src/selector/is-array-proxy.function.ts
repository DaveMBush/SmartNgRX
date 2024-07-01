import { castTo } from '../common/cast-to.function';
import { isProxy } from '../common/is-proxy.const';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { ArrayProxy } from './array-proxy.class';

// eslint-disable-next-line jsdoc/require-returns -- this is a type guard
/**
 * Determines if the specified object is an ArrayProxy
 *
 * @param arr the object to check
 */
export function isArrayProxy<
  P extends SmartNgRXRowBase,
  C extends SmartNgRXRowBase,
>(arr: unknown): arr is ArrayProxy<P, C> {
  // we have to pass in type unknown so the arr is ArrayProxy<P, C>
  // return will work.
  return !!castTo<Record<string, boolean>>(arr)[isProxy];
}
