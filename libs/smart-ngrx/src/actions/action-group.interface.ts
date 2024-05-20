/* eslint-disable @typescript-eslint/no-explicit-any -- necessary for createActionGroup*/
/* jscpd:ignore-start */
import { ActionCreator } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';

import { StringLiteralSource } from '../ngrx-internals/string-literal-source.type';
import { IdsProp } from '../types/ids-prop.interface';
import { RowProp } from '../types/row-prop.interface';
import { RowsProp } from '../types/rows-prop.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { UpdateChanges } from '../types/update-changes.interface';
/* jscpd:ignore-start */

export interface ActionGroup<T extends SmartNgRXRowBase> {
  updateMany: ActionCreator<
    `[${any}] Update Many`,
    (
      props: UpdateChanges<T>,
    ) => TypedAction<`[${any}] Update Many`> & UpdateChanges<T>
  >;
  remove: ActionCreator<
    `[${any}] Remove`,
    (props: IdsProp) => IdsProp & TypedAction<`[${any}] Remove`>
  >;
  loadByIds: ActionCreator<
    `[${any}] Load By Ids`,
    (props: IdsProp) => IdsProp & TypedAction<`[${any}] Load By Ids`>
  >;
  storeRows: ActionCreator<
    `[${any}] Store Rows`,
    (props: RowsProp<T>) => RowsProp<T> & TypedAction<`[${any}] Store Rows`>
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
      parentFeature: StringLiteralSource<string>;
      parentEntityName: StringLiteralSource<string>;
    }) => TypedAction<`[${any}] Add`> & {
      row: T;
      parentId: string;
      parentFeature: StringLiteralSource<string>;
      parentEntityName: StringLiteralSource<string>;
    }
  >;
  addSuccess: ActionCreator<
    `[${any}] Add Success`,
    (props: {
      oldRow: T;
      newRow: T;
      parentId: string;
      parentFeature: StringLiteralSource<string>;
      parentEntityName: StringLiteralSource<string>;
    }) => TypedAction<`[${any}] Add Success`> & {
      oldRow: T;
      newRow: T;
      parentId: string;
      parentFeature: StringLiteralSource<string>;
      parentEntityName: StringLiteralSource<string>;
    }
  >;
  delete: ActionCreator<
    `[${any}] Delete`,
    (props: {
      id: string;
      parentFeature: StringLiteralSource<string>;
      parentEntityName: StringLiteralSource<string>;
      parentIds: string[];
    }) => TypedAction<`[${any}] Delete`> & {
      id: string;
      parentFeature: StringLiteralSource<string>;
      parentEntityName: StringLiteralSource<string>;
      parentIds: string[];
    }
  >;
}
