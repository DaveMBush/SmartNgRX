export interface CUDMessage {
  ids: string[];
  action: 'create' | 'delete' | 'update';
  table: string;
}
