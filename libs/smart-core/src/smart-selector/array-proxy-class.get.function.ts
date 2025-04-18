import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { BaseArrayProxy } from './base-array-proxy.class';
import { VirtualArray } from './virtual-array.class';

function isVirtualArray(item: unknown): item is VirtualArray<SmartNgRXRowBase> {
  return typeof item === 'object' && item !== null && 'rawArray' in item;
}

/**
 * Implementation of the get method for the BaseArrayProxy class.
 *
 * @param target The target of the get method which is the BaseArrayProxy class itself.
 * @param prop prop The property to get from the target.
 * @returns The value of the property.
 */
export function arrayProxyClassGet<
  P extends SmartNgRXRowBase,
  C extends SmartNgRXRowBase,
>(target: BaseArrayProxy<P, C>, prop: string | symbol): unknown {
  if (typeof prop === 'string' && !Number.isNaN(+prop)) {
    return target.getAtIndex(+prop);
  }
  if (prop === 'length' && isVirtualArray(target.rawArray)) {
    return (target.rawArray as unknown as VirtualArray<P, C>).length;
  }
  return Reflect.get(target, prop as keyof BaseArrayProxy);
}
