/* eslint-disable @typescript-eslint/no-explicit-any -- necessary for createActionGroup*/
/* jscpd:ignore-start */
import { Action, ActionCreator } from '@ngrx/store';

import { IdsProp } from '../types/ids-prop.interface';
import { RowProp } from '../types/row-prop.interface';
import { RowsProp } from '../types/rows-prop.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { UpdateChanges } from '../types/update-changes.interface';
/* jscpd:ignore-start */

/**
 * Interface that describes a group of actions for a feature
 */
export interface ActionGroup<T extends SmartNgRXRowBase = SmartNgRXRowBase> {
  updateMany: ActionCreator<
    `[${any}] Update Many`,
    (
      props: UpdateChanges<T>,
    ) => Action<`[${any}] Update Many`> & UpdateChanges<T>
  >;
  remove: ActionCreator<
    `[${any}] Remove`,
    (props: IdsProp) => Action<`[${any}] Remove`> & IdsProp
  >;
  loadByIds: ActionCreator<
    `[${any}] Load By Ids`,
    (props: IdsProp) => Action<`[${any}] Load By Ids`> & IdsProp
  >;
  storeRows: ActionCreator<
    `[${any}] Store Rows`,
    (props: RowsProp<T>) => Action<`[${any}] Store Rows`> & RowsProp<T>
  >;
  update: ActionCreator<
    `[${any}] Update`,
    (props: {
      old: RowProp<T>;
      new: RowProp<T>;
    }) => Action<`[${any}] Update`> & { old: RowProp<T>; new: RowProp<T> }
  >;
  addToStore: ActionCreator<
    `[${any}] Add To Store`,
    (props: RowProp<T>) => Action<`[${any}] Add To Store`> & RowProp<T>
  >;
  add: ActionCreator<
    `[${any}] Add`,
    (props: {
      row: T;
      parentId: string;
      parentFeature: string;
      parentEntityName: string;
    }) => Action<`[${any}] Add`> & {
      row: T;
      parentId: string;
      parentFeature: string;
      parentEntityName: string;
    }
  >;
  addSuccess: ActionCreator<
    `[${any}] Add Success`,
    (props: {
      oldRow: T;
      newRow: T;
      parentId: string;
      parentFeature: string;
      parentEntityName: string;
    }) => Action<`[${any}] Add Success`> & {
      oldRow: T;
      newRow: T;
      parentId: string;
      parentFeature: string;
      parentEntityName: string;
    }
  >;
  delete: ActionCreator<
    `[${any}] Delete`,
    (props: {
      id: string;
      parentInfo: { feature: string; entity: string; ids: string[] }[];
    }) => Action<`[${any}] Delete`> & {
      id: string;
      parentInfo: { feature: string; entity: string; ids: string[] }[];
    }
  >;
}
