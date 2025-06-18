export interface UpdateStr<T> {
  id: string;
  changes: Partial<T>;
}
