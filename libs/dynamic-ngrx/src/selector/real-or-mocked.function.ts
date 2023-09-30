import { EntityState } from '@ngrx/entity';

export function realOrMocked<T>(
  entityState: EntityState<T>,
  id: string,
  defaultObject: T,
): T {
  const record = entityState.entities;
  return (
    record[id] ?? {
      id,
      ...defaultObject,
    }
  );
}
