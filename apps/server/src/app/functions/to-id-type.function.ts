import { WithCreatedDate } from './with-created-date.interface';

export function toIdType(
  v: Omit<WithCreatedDate, 'created'>,
): Omit<WithCreatedDate, 'created'> {
  return { type: v.type, id: v.id };
}
