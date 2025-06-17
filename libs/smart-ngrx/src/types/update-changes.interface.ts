import { UpdateStr } from '@smarttools/smart-core';

/**
 * Interface that defines the changes that need to be made to the store
 * when updating an entity
 */
export interface UpdateChanges<T> {
  changes: UpdateStr<T>[];
}
