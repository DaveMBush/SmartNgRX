/* eslint-disable @typescript-eslint/no-explicit-any -- necessary for createActionGroup*/
import {
  ActionCreator,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';

import { StringLiteralSource } from '../ngrx-internals/string-literal-source.type';
import { IdProp } from '../types/id-prop.interface';
import { IdsProp } from '../types/ids-prop.interface';
import { RowProp } from '../types/row-prop.interface';
import { RowsProp } from '../types/rows-prop.interface';

interface ActionGroup<T> {
  load: ActionCreator<`[${any}] Load`, () => TypedAction<`[${any}] Load`>>;
  loadSuccess: ActionCreator<
    `[${any}] Load Success`,
    (props: RowsProp<T>) => RowsProp<T> & TypedAction<`[${any}] Load Success`>
  >;
  markDirty: ActionCreator<
    `[${any}] Mark Dirty`,
    (props: IdProp) => IdProp & TypedAction<`[${any}] Mark Dirty`>
  >;
  garbageCollect: ActionCreator<
    `[${any}] Garbage Collect`,
    (props: IdProp) => IdProp & TypedAction<`[${any}] Garbage Collect`>
  >;
  loadByIds: ActionCreator<
    `[${any}] Load By Ids`,
    (props: IdsProp) => IdsProp & TypedAction<`[${any}] Load By Ids`>
  >;
  loadByIdsSuccess: ActionCreator<
    `[${any}] Load By Ids Success`,
    (
      props: RowsProp<T>,
    ) => RowsProp<T> & TypedAction<`[${any}] Load By Ids Success`>
  >;
  update: ActionCreator<
    `[${any}] Update`,
    (props: RowProp<T>) => RowProp<T> & TypedAction<`[${any}] Update`>
  >;
  addToStore: ActionCreator<
    `[${any}] Add To Store`,
    (props: RowProp<T>) => RowProp<T> & TypedAction<`[${any}] Add To Store`>
  >;
  add: ActionCreator<
    `[${any}] Add`,
    (props: {
      row: T;
      options?: Record<string, unknown> | undefined;
    }) => TypedAction<`[${any}] Add`> & {
      row: T;
      options?: Record<string, unknown> | undefined;
    }
  >;
  delete: ActionCreator<
    `[${any}] Delete`,
    (props: IdProp) => IdProp & TypedAction<`[${any}] Delete`>
  >;
}

type CachedActionGroup = ActionGroup<unknown>;

const actionGroupCache = new Map<string, CachedActionGroup>();

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
      'Load By Ids Success': props<RowsProp<T>>(), // using entities gets around passing in an anonymous interface
      Update: props<RowProp<T>>(),
      'Add To Store': props<RowProp<T>>(),
      Add: props<{ row: T; options?: Record<string, unknown> }>(),
      Delete: props<IdProp>(),
    },
  });
  actionGroupCache.set(source, actionGroup as CachedActionGroup);
  return actionGroup as ActionGroup<T>;
}
