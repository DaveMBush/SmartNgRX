import { EntityState } from '@ngrx/entity';
import { DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';

import { SmartNgRXRowBase } from './smart-ngrx-row-base.interface';

/**
 * This type allows us to deal with just the MarkAndDelete part
 * of an entity. This is used internally.
 *
 * @see SmartNgRXRowBase
 */
export type MarkAndDeleteSelector = MemoizedSelector<
  object,
  EntityState<SmartNgRXRowBase>,
  DefaultProjectorFn<EntityState<SmartNgRXRowBase>>
>;
