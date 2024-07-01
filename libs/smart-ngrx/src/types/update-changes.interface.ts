import { Update } from '@ngrx/entity/src/models';

/**
 * Interface that defines the changes that need to be made to the store
 * when updating an entity
 */
export interface UpdateChanges<T> {
  changes: Update<T>[];
}
