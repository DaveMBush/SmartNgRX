/* eslint-disable @typescript-eslint/no-explicit-any -- necessary for createActionGroup*/
import { ActionCreator } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';

import { IdProp } from '../types/id-prop.interface';
import { IdsProp } from '../types/ids-prop.interface';
import { RowProp } from '../types/row-prop.interface';
import { RowsProp } from '../types/rows-prop.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';

export interface ActionGroup<T extends SmartNgRXRowBase> {
  load: ActionCreator<`[${any}] Load`, () => TypedAction<`[${any}] Load`>>;
  loadSuccess: ActionCreator<
    `[${any}] Load Success`,
    (props: RowsProp<T>) => RowsProp<T> & TypedAction<`[${any}] Load Success`>
  >;
  markDirty: ActionCreator<
    `[${any}] Mark Dirty`,
    (props: IdsProp) => IdsProp & TypedAction<`[${any}] Mark Dirty`>
  >;
  markNotDirty: ActionCreator<
    `[${any}] Mark Not Dirty`,
    (props: IdsProp) => IdsProp & TypedAction<`[${any}] Mark Not Dirty`>
  >;
  garbageCollect: ActionCreator<
    `[${any}] Garbage Collect`,
    (props: IdsProp) => IdsProp & TypedAction<`[${any}] Garbage Collect`>
  >;
  loadByIds: ActionCreator<
    `[${any}] Load By Ids`,
    (props: IdsProp) => IdsProp & TypedAction<`[${any}] Load By Ids`>
  >;
  loadByIdsPreload: ActionCreator<
    `[${any}] Load By Ids Preload`,
    (props: IdsProp) => IdsProp & TypedAction<`[${any}] Load By Ids Preload`>
  >;
  loadByIdsSuccess: ActionCreator<
    `[${any}] Load By Ids Success`,
    (
      props: RowsProp<T>,
    ) => RowsProp<T> & TypedAction<`[${any}] Load By Ids Success`>
  >;
  update: ActionCreator<
    `[${any}] Update`,
    (props: {
      old: RowProp<T>;
      new: RowProp<T>;
    }) => TypedAction<`[${any}] Update`> & { old: RowProp<T>; new: RowProp<T> }
  >;
  addToStore: ActionCreator<
    `[${any}] Add To Store`,
    (props: RowProp<T>) => RowProp<T> & TypedAction<`[${any}] Add To Store`>
  >;
  add: ActionCreator<
    `[${any}] Add`,
    (props: {
      row: T;
      parentId: string;
      parentActions: ActionGroup<SmartNgRXRowBase>;
    }) => TypedAction<`[${any}] Add`> & {
      row: T;
      parentId: string;
      parentActions: ActionGroup<SmartNgRXRowBase>;
    }
  >;
  addSuccess: ActionCreator<
    `[${any}] Add Success`,
    (props: {
      oldRow: T;
      newRow: T;
      parentId: string;
      parentActions: ActionGroup<SmartNgRXRowBase>;
    }) => TypedAction<`[${any}] Add Success`> & {
      oldRow: T;
      newRow: T;
      parentId: string;
      parentActions: ActionGroup<SmartNgRXRowBase>;
    }
  >;
  delete: ActionCreator<
    `[${any}] Delete`,
    (props: IdProp) => IdProp & TypedAction<`[${any}] Delete`>
  >;
}
