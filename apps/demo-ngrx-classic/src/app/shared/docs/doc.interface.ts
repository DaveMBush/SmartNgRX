import { SmartNgRXRowBase } from '@smarttools/smart-ngrx';

export interface Doc extends SmartNgRXRowBase {
  did: string;
  name: string;
}
