/* eslint-disable @typescript-eslint/no-explicit-any -- necessary for createActionGroup*/
/* jscpd:ignore-start */
import { Action, ActionCreator } from '@ngrx/store';
import { RowProp, SmartNgRXRowBase } from '@smarttools/smart-core';

import { IdsProp } from './ids-prop.interface';
import { RowsProp } from './rows-prop.interface';
import { UpdateChanges } from './update-changes.interface';
/* jscpd:ignore-start */

/**
 * Interface that describes a group of actions for a feature
 */
export interface ActionGroup<T extends SmartNgRXRowBase = SmartNgRXRowBase> {
  /**
   * Action to update state with multiple changes at a time.
   */
  updateMany: ActionCreator<
    `[${any}] Update Many`,
    (
      props: UpdateChanges<T>,
    ) => Action<`[${any}] Update Many`> & UpdateChanges<T>
  >;
  /**
   * Action to remove rows represented by the IDs from the store.
   */
  remove: ActionCreator<
    `[${any}] Remove`,
    (props: IdsProp) => Action<`[${any}] Remove`> & IdsProp
  >;

  /**
   * Action to put rows into the store.
   */
  storeRows: ActionCreator<
    `[${any}] Store Rows`,
    (props: RowsProp<T>) => Action<`[${any}] Store Rows`> & RowsProp<T>
  >;
  /**
   * Action to trigger upserting a new/existing row
   */
  upsertRow: ActionCreator<
    `[${any}] Upsert Row`,
    (props: RowProp<T>) => Action<`[${any}] Upsert Row`> & RowProp<T>
  >;
}
