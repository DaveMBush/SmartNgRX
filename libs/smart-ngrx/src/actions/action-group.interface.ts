/* eslint-disable @typescript-eslint/no-explicit-any -- necessary for createActionGroup*/
/* jscpd:ignore-start */
import { Action, ActionCreator } from '@ngrx/store';

import { IdsProp } from '../types/ids-prop.interface';
import { IndexesProp } from '../types/indexes-props.interface';
import { RowProp } from '../types/row-prop.interface';
import { RowsProp } from '../types/rows-prop.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { UpdateChanges } from '../types/update-changes.interface';
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
  // /**
  //  * Action to load rows by their IDs.
  //  */
  // loadByIds: ActionCreator<
  //   `[${any}] Load By Ids`,
  //   (props: IdsProp) => Action<`[${any}] Load By Ids`> & IdsProp
  // >;

  // /**
  //  * Action to load rows by their index.
  //  */
  // loadByIndexes: ActionCreator<
  //   `[${any}] Load By Indexes`,
  //   (props: IndexesProp) => Action<`[${any}] Load By Indexes`> & IndexesProp
  // >;
  // /**
  //  * Action to put rows into the store.
  //  */
  storeRows: ActionCreator<
    `[${any}] Store Rows`,
    (props: RowsProp<T>) => Action<`[${any}] Store Rows`> & RowsProp<T>
  >;
  /**
   * Action to update a row in the store. The old row is passed so we can roll back
   * on failure.
   */
  update: ActionCreator<
    `[${any}] Update`,
    (props: {
      old: RowProp<T>;
      new: RowProp<T>;
    }) => Action<`[${any}] Update`> & {
      old: RowProp<T>;
      new: RowProp<T>;
    }
  >;
  /**
   * Action to trigger adding a new row
   */
  add: ActionCreator<
    `[${any}] Add`,
    (props: {
      row: T;
      feature: string;
      entity: string;
      parentId: string;
      parentFeature: string;
      parentEntityName: string;
    }) => Action<`[${any}] Add`> & {
      row: T;
      feature: string;
      entity: string;
      parentId: string;
      parentFeature: string;
      parentEntityName: string;
    }
  >;
  /**
   * Action to trigger storing a new row
   */
  addSuccess: ActionCreator<
    `[${any}] Add Success`,
    (props: {
      oldRow: T;
      newRow: T;
      feature: string;
      entity: string;
      parentId: string;
      parentFeature: string;
      parentEntityName: string;
    }) => Action<`[${any}] Add Success`> & {
      oldRow: T;
      newRow: T;
      feature: string;
      entity: string;
      parentId: string;
      parentFeature: string;
      parentEntityName: string;
    }
  >;
  // /**
  //  * Action to trigger deleting a new row, this eventually calls the effect service
  //  * which will handle the physical delete on the server.
  //  */
  // delete: ActionCreator<
  //   `[${any}] Delete`,
  //   (props: {
  //     id: string;
  //     parentInfo: {
  //       feature: string;
  //       entity: string;
  //       ids: string[];
  //     }[];
  //   }) => Action<`[${any}] Delete`> & {
  //     id: string;
  //     parentInfo: {
  //       feature: string;
  //       entity: string;
  //       ids: string[];
  //     }[];
  //   }
  // >;
}
