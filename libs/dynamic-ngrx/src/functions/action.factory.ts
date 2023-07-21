/* eslint-disable @typescript-eslint/no-explicit-any -- necessary for createActionGroup*/
import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { StringLiteralSource } from '../ngrx-internals/string-literal-source.type';
import { IdProp } from '../types/id-prop.interface';
import { IdsProp } from '../types/ids-prop.interface';
import { RowProp } from '../types/row-prop.interface';
import { RowsProp } from '../types/rows-prop.interface';

/**
 * This creates all the Actions for a given source.
 *
 * Note: because ActionGroup is an NgRX internal type,
 * we are leaving the type unspecified here and letting
 * TypeScript infer it.
 *
 * @param source - The source of the actions for this effect
 * @returns The action group for the source provided
 *
 * @see `IdProp`
 * @see `IdsProp`
 * @see `RowProp`
 * @see `RowsProp`
 */
export function actionFactory<Source extends string, T>(
  source: StringLiteralSource<Source>
) {
  return createActionGroup({
    source: source as any,
    events: {
      Load: emptyProps(),
      'Load Success': props<RowsProp<T>>(),
      'Mark Dirty': props<IdProp>(),
      'Garbage Collect': props<IdProp>(),
      'Load By Ids': props<IdsProp>(),
      'Load By Ids Success': props<RowsProp<T>>(), // using entities gets around passing in an anonymous interface
      Update: props<RowProp<T>>(),
      'Add To Store': props<RowProp<T>>(),
      Add: props<{ row: T; options?: Record<string, unknown> }>(),
      Delete: props<IdProp>(),
    },
  });
}
