import { assert } from './assert.function';
import { isNullOrUndefined } from './is-null-or-undefined.function';

/**
 * retrieves the zoneless version of the function
 *
 * @param func The name of the symbol we need the zoneless version of
 * @returns the zoneless version of the function
 */
export function zoneless(func: string): unknown {
  /* istanbul ignore next -- difficult to test */
  const zonelessSymbol =
    typeof window !== 'undefined' &&
    window[('__zone_symbol__' + func) as keyof typeof window];
  /* istanbul ignore next -- can only be triggered at runtime without some hacking mocking for trivial code */
  if (isNullOrUndefined(zonelessSymbol)) {
    switch (func) {
      // our code only tries to access Promise
      case 'Promise':
        return Promise;
      default:
        break;
    }
  }
  // Leaving this catch in case we try to use some other
  // zoneless function.
  assert(
    !isNullOrUndefined(zonelessSymbol),
    `${func} does not appear to be patched by ngZone`,
  );
  return zonelessSymbol;
}
