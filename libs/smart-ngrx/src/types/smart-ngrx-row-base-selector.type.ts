import { EntityState } from '@ngrx/entity';
import { DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';

import { SmartNgRXRowBase } from './smart-ngrx-row-base.interface';

/**
 * This type allows us to deal with just the SmartNgRXRowBase part
 * of an entity. This is used internally.
 *
 * @see SmartNgRXRowBase
 */
export type SmartNgRXRowBaseSelector = MemoizedSelector<
  object,
  EntityState<SmartNgRXRowBase>,
  DefaultProjectorFn<EntityState<SmartNgRXRowBase>>
>;
