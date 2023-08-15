/**
 * This is an internal function documented here for reference by people
 * doing development on this library.
 *
 * Asserts that a value is true. You should only use one condition
 * at a time. If you are working with a value that should always be
 * true, this is easier than putting if(condition) around what you
 * are going to use the condition for.
 *
 * @param condition - condition to check
 * @param context - description of what we checked.
 *                  If you put a GUID in the string it will
 *                  make it easier to find the error in the
 *                  source code.
 * @returns asserts condition or throws exception
 */
export function assert(condition: boolean, context: string): asserts condition {
  if (!condition) {
    throw new Error(`Error: ${context}`);
  }
}
