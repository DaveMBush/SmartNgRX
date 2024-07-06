import { SmartNgRXRowBase } from '@smarttools/smart-ngrx/types/smart-ngrx-row-base.interface';

export interface Doc extends SmartNgRXRowBase {
  did: string;
  name: string;
}
