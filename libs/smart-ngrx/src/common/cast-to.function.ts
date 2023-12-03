/**
 * Casts a value to a given type.
 * This is instead of using:
 *
 * ``` typescript
 * interface Foo {
 * bar: string;
 * }
 * const foo: Foo = { bar: 'baz' };
 *
 * // cast foo to a Record<string, string> so we
 * // can access bar as a string index
 * const bar = foo as unknown as Record<string, string>;
 * const barVar = bar['bar'];
 * ```
 *
 * ## Usage:
 * ``` typescript
 * interface Foo {
 * bar: string;
 * }
 * const foo: Foo = { bar: 'baz' };
 *
 * // cast foo to a Record<string, string> so we
 * // can access bar as a string index
 * const bar = castTo<Record<string, string>>(foo);
 * const barVar = bar['bar'];
 * ```
 *
 * @param value the value to cast
 * @returns the value cast as T
 */
export function castTo<T>(value: unknown): T {
  return value as T;
}
