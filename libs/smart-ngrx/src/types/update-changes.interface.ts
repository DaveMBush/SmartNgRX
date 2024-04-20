import { Update } from '@ngrx/entity/src/models';

export interface UpdateChanges<T> {
  changes: Update<T>[];
}
