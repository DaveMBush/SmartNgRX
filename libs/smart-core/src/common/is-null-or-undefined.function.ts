/**
 * determines if the value passed in is null or undefined
 * this is safer than just checking for truthy or falsy
 * because 0, '' are also falsy values.
 *
 * @param value the value to check
 * @returns true if the value is null or undefined
 */
export function isNullOrUndefined(value: unknown): boolean {
  return value === null || value === undefined;
}
