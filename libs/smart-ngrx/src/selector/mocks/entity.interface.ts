/**
 * Used by unit tests
 */
export interface Entity {
  id: string;
  name: string;
  isDirty?: boolean;
  children?: string[];
}
