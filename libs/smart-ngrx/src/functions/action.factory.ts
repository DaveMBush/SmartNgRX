/* eslint-disable @typescript-eslint/no-explicit-any -- necessary for createActionGroup*/
import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { StringLiteralSource } from '../ngrx-internals/string-literal-source.type';
import { IdProp } from '../types/id-prop.interface';
import { IdsProp } from '../types/ids-prop.interface';
import { RowProp } from '../types/row-prop.interface';
import { RowsProp } from '../types/rows-prop.interface';
import { ActionGroup } from './action-group.interface';

type CachedActionGroup = ActionGroup<unknown>;

const actionGroupCache = new Map<string, CachedActionGroup>();

/**
 * This creates all the Actions for a given source.
 * You would only need to call this if you needed to directly
 * dispatch one of these actions from your own code. They
 * are used internally and are only exposed for convenience.
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
  source: StringLiteralSource<Source>,
): ActionGroup<T> {
  if (actionGroupCache.has(source)) {
    return actionGroupCache.get(source) as ActionGroup<T>;
  }

  const actionGroup = createActionGroup({
    source: source as any,
    events: {
      Load: emptyProps(),
      'Load Success': props<RowsProp<T>>(),
      'Mark Dirty': props<IdProp>(),
      'Garbage Collect': props<IdProp>(),
      'Load By Ids': props<IdsProp>(),
      'Load By Ids Preload': props<IdsProp>(),
      'Load By Ids Success': props<RowsProp<T>>(),
      Update: props<RowProp<T>>(),
      'Add To Store': props<RowProp<T>>(),
      Add: props<{ row: T; options?: Record<string, unknown> }>(),
      Delete: props<IdProp>(),
    },
  });
  actionGroupCache.set(source, actionGroup as CachedActionGroup);
  return actionGroup as ActionGroup<T>;
}
