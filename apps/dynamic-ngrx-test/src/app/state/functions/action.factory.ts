import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { StringLiteralSource } from './string-literal-source.type';

export const actionFactory = <Source extends string, T>(
  source: StringLiteralSource<Source>
) =>
  createActionGroup({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment -- only way I could get this to work without worse hacks or rewriting createActionGroup
    source: source as any,
    events: {
      'load': emptyProps(),
      'loadSuccess': props<{payload: T[]}>(),
      'add': props<{payload: T}>(),
    }
  });

