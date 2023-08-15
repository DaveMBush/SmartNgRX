import { EntityState } from '@ngrx/entity';
import { DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';

import { MarkAndDelete } from './mark-and-delete.interface';

/**
 * This type allows us to deal with just the MarkAndDelete part
 * of an entity. This is used internally.
 *
 * @see MarkAndDelete
 */
export type MarkAndDeleteSelector = MemoizedSelector<
  object,
  EntityState<MarkAndDelete>,
  DefaultProjectorFn<EntityState<MarkAndDelete>>
>;
