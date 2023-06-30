/**
 * StringLiteralCheck was copied from NgRX because it is hidden.  It forces
 * the source parameter to be a string literal.
 */
type StringLiteralCheck<
  Str extends string,
  Name extends string
> = string extends Str ? `${Name} must be a string literal type` : unknown;
export type StringLiteralSource<Source extends string> = Source &
  StringLiteralCheck<Source, 'source'>;
