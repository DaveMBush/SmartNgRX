import { EntityState } from '@ngrx/entity';
import { Action } from '@ngrx/store';

import { IdsProp } from '../types/ids-prop.interface';
import { MarkAndDelete } from '../types/mark-and-delete.interface';
import { ensureDataLoaded } from './ensure-data-loaded.function';
import { realOrMocked } from './real-or-mocked.function';

export function getArrayItem<T extends MarkAndDelete>(
  entityState: EntityState<T>,
  id: string,
  action: (p: IdsProp) => Action,
  mockRow: T,
): T {
  ensureDataLoaded(entityState, id, action);
  return realOrMocked(entityState, id, mockRow);
}
