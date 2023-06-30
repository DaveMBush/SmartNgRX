/* eslint-disable @typescript-eslint/no-explicit-any -- necessary for createActionGroup*/
import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { StringLiteralSource } from '../ngrx-internals/string-literal-source.type';
import { IdProp } from '../types/id-prop.interface';
import { IdsProp } from '../types/ids-prop.interface';
import { RowProp } from '../types/row-prop.interface';
import { RowsProp } from '../types/rows-prop.interface';

export const actionFactory = <Source extends string, T>(
  source: StringLiteralSource<Source>
) =>
  createActionGroup({
    source: source as any,
    events: {
      'Load': emptyProps(),
      'Load Success': props<{rows: T[]}>(),
      'Mark Dirty': props<IdProp>(),
      'Garbage Collect': props<IdProp>(),
      'Load By Ids': props<IdsProp>(),
      'Load By Ids Success': props<RowsProp<T>>(), // using entities gets around passing in an anonymous interface
      Update: props<RowProp<T>>(),
      'Add To Store': props<RowProp<T>>(),
      Add: props<{row: T, options?: Record<string, unknown> }>(),
      Delete: props<IdProp>(),
    }
  });

