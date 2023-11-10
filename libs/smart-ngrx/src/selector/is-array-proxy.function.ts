import { castTo } from '../common/cast-to.function';
import { MarkAndDelete } from '../types/mark-and-delete.interface';
import { ArrayProxy } from './array-proxy.class';

export function isArrayProxy(arr: unknown): arr is ArrayProxy<MarkAndDelete> {
  return !!castTo<ArrayProxy<MarkAndDelete>>(arr).θisProxyθ;
}
