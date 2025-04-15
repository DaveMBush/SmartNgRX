import { EntityState } from '@ngrx/entity';
import { DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';
import { SmartNgRXRowBase } from '@smarttools/core';

/**
 * This type allows us to deal with just the SmartNgRXRowBase part
 * of an entity. This is used internally.
 *
 * @see SmartNgRXRowBase
 */
export type SmartNgRXRowBaseSelector<T extends SmartNgRXRowBase> =
  | MemoizedSelector<object, EntityState<T>, DefaultProjectorFn<EntityState<T>>>;
