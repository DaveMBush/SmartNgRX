import { castTo } from '../common/cast-to.function';
import { forNext } from '../common/for-next.function';
import { ArrayProxy } from '../smart-selector/array-proxy.class';
import { VirtualArray } from '../smart-selector/virtual-array.class';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';

function isVirtualArray(
  array: unknown,
): array is VirtualArray<SmartNgRXRowBase> {
  return array instanceof VirtualArray;
}

/**
 * If the row has a dirty flag set, this tells the virtualArray that
 * the indexes need to be refetched.
 *
 * @param row the row to check
 */
export function forceRefetchOfVirtualIndexes<T extends SmartNgRXRowBase>(
  row: T,
) {
  if (row.isDirty !== true) {
    return;
  }
  const keys = Object.keys(row) as (keyof T)[];
  forNext(keys, forNextFunction<T>(row));
}

function forNextFunction<T extends SmartNgRXRowBase>(
  row: Record<keyof T, unknown>,
) {
  return function innerForNextFunction(key: keyof T) {
    const arrayProxy = row[key] as ArrayProxy;
    if (arrayProxy === undefined) {
      return;
    }
    const rawArray = castTo<VirtualArray<SmartNgRXRowBase>>(
      arrayProxy.rawArray,
    );
    if (isVirtualArray(rawArray)) {
      rawArray.refetchIndexes();
    }
  };
}
