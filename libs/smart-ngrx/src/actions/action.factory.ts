/* eslint-disable @typescript-eslint/no-explicit-any -- necessary for createActionGroup*/
/* jscpd:ignore-start */
import { createActionGroup, props } from '@ngrx/store';

import { psi } from '../common/theta.const';
import { IdsProp } from '../types/ids-prop.interface';
import { RowProp } from '../types/row-prop.interface';
import { RowsProp } from '../types/rows-prop.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { UpdateChanges } from '../types/update-changes.interface';
import { ActionGroup } from './action-group.interface';
import { IndexesProp } from '../types/indexes-props.interface';
/* jscpd:ignore-end */
const actionGroupCache = new Map<string, unknown>();

/**
 * This creates all the Actions for a given source.
 * You would only need to call this if you needed to directly
 * dispatch one of these actions from your own code. They
 * are used internally and are only exposed for convenience.
 *
 * @param feature the feature this action is for
 * @param entity the entity within the feature this action is for
 * @returns The `ActionGroup` for the source provided
 * @see `IdProp`
 * @see `IdsProp`
 * @see `RowProp`
 * @see `RowsProp`
 */
export function actionFactory<T extends SmartNgRXRowBase>(
  feature: string,
  entity: string,
): ActionGroup<T> {
  const source = `${feature}${psi}${entity}`;
  const cached = actionGroupCache.get(source) as ActionGroup<T> | undefined;
  if (cached) {
    return cached;
  }

  const actionGroup = createActionGroup({
    source: source as any,
    events: {
      'Update Many': props<UpdateChanges<T>>(),
      Remove: props<IdsProp>(),
      'Load By Ids': props<IdsProp>(),
      'Load By Ids Preload': props<IdsProp>(),
      'Load By Indexes': props<IndexesProp>(),
      'Store Rows': props<RowsProp<T>>(),
      Update: props<{ old: RowProp<T>; new: RowProp<T> }>(),
      'Add To Store': props<RowProp<T>>(),
      Add: props<{
        row: T;
        parentId: string;
        parentFeature: string;
        parentEntityName: string;
      }>(),
      'Add Success': props<{
        newRow: T;
        oldRow: T;
        parentId: string;
        parentFeature: string;
        parentEntityName: string;
      }>(),
      Delete: props<{
        id: string;
        parentInfo: { feature: string; entity: string; ids: string[] }[];
      }>(),
    },
  });
  actionGroupCache.set(source, actionGroup);
  return actionGroup;
}
