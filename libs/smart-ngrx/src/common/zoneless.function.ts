import { assert } from './assert.function';
import { castTo } from './cast-to.function';
import { isNullOrUndefined } from './is-null-or-undefined.function';

/**
 * retrieves the zoneless version of the function
 * @param func The name of the symbol we need the zoneless version of
 * @returns the zoneless version of the function
 */
export function zoneless(func: string): unknown {
  const windowRecord = castTo<Record<string, unknown>>(window);
  const zonelessSymbol = windowRecord['__zone_symbol__' + func];
  assert(
    !isNullOrUndefined(zonelessSymbol),
    `${func} does not appear to be patched by ngZone`,
  );
  return zonelessSymbol;
}
