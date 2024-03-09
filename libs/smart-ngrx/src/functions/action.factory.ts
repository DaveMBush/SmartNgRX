/* eslint-disable @typescript-eslint/no-explicit-any -- necessary for createActionGroup*/
import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { psi } from '../common/theta.const';
import { StringLiteralSource } from '../ngrx-internals/string-literal-source.type';
import { IdProp } from '../types/id-prop.interface';
import { IdsProp } from '../types/ids-prop.interface';
import { RowProp } from '../types/row-prop.interface';
import { RowsProp } from '../types/rows-prop.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { ActionGroup } from './action-group.interface';

const actionGroupCache = new Map<string, unknown>();

/**
 * This creates all the Actions for a given source.
 * You would only need to call this if you needed to directly
 * dispatch one of these actions from your own code. They
 * are used internally and are only exposed for convenience.
 *
 * @param feature the feature this action is for
 * @param entity the entity within the feature this action is for
 * @returns The action group for the source provided
 * @see `IdProp`
 * @see `IdsProp`
 * @see `RowProp`
 * @see `RowsProp`
 */
export function actionFactory<
  T extends SmartNgRXRowBase,
  Feature extends string = string,
  Entity extends string = string,
>(
  feature: StringLiteralSource<Feature>,
  entity: StringLiteralSource<Entity>,
): ActionGroup<T> {
  const source = `${feature}${psi}${entity}`;
  const cached = actionGroupCache.get(source) as ActionGroup<T> | undefined;
  if (cached) {
    return cached;
  }

  const actionGroup = createActionGroup({
    source: source as any,
    events: {
      Load: emptyProps(),
      'Load Success': props<RowsProp<T>>(),
      'Mark Dirty': props<IdsProp>(),
      'Mark Not Dirty': props<IdsProp>(),
      'Garbage Collect': props<IdsProp>(),
      'Load By Ids': props<IdsProp>(),
      'Load By Ids Preload': props<IdsProp>(),
      'Load By Ids Success': props<RowsProp<T>>(),
      Update: props<{ old: RowProp<T>; new: RowProp<T> }>(),
      'Add To Store': props<RowProp<T>>(),
      Add: props<{
        row: T;
        parentId: string;
        parentActions: ActionGroup<SmartNgRXRowBase>;
      }>(),
      Delete: props<IdProp>(),
    },
  });
  actionGroupCache.set(source, actionGroup);
  return actionGroup;
}
