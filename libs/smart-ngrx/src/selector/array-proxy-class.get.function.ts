import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { ArrayProxy } from './array-proxy.class';

/**
 * Implementation of the get method for the ArrayProxy class.
 *
 * @param target The target of the get method which is the ArrayProxy class itself.
 * @param prop prop The property to get from the target.
 * @returns The value of the property.
 */
export function arrayProxyClassGet<
  P extends object,
  C extends SmartNgRXRowBase,
>(target: ArrayProxy<P, C>, prop: string | symbol): unknown {
  if (typeof prop === 'string' && !isNaN(+prop)) {
    return target.getAtIndex(+prop);
  }
  return Reflect.get(
    target,
    prop as keyof ArrayProxy<object, SmartNgRXRowBase>,
  );
}
