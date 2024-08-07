/**
 * Allows us to iterate over an array using for/next instead of using
 * an iterator (forEach for example) which can be 10x slower. This provides
 * the same benefit as forEach but without the performance hit.
 *
 * @param array the array we want to iterate over
 * @param callback the callback function to call for each item in the array.
 */
export function forNext<T>(
  array: T[],
  callback: (item: T, index: number, array: T[]) => void,
): void {
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i, array);
  }
}
