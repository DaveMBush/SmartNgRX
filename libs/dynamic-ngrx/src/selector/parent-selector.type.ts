import { EntityState } from '@ngrx/entity';
import { MemoizedSelector } from '@ngrx/store';

/**
 * Shorthand for the type of the parentSelector.
 *
 * @see `createInnerSmartSelector`
 * @see `createSmartSelector`
 */
export type ParentSelector<P> = MemoizedSelector<object, EntityState<P>>;
