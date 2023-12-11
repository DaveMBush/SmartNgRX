import { castTo } from '../common/cast-to.function';
import { isProxy } from '../common/is-proxy.const';
import { MarkAndDelete } from '../types/mark-and-delete.interface';
import { ArrayProxy } from './array-proxy.class';

// eslint-disable-next-line jsdoc/require-returns -- this is a type guard
/**
 * Determines if the specified object is an ArrayProxy
 *
 * @param arr the object to check
 */
export function isArrayProxy(arr: unknown): arr is ArrayProxy<MarkAndDelete> {
  return !!castTo<Record<string, boolean>>(arr)[isProxy];
}
