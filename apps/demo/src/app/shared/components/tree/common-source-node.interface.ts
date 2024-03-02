import { SmartNgRXRowBase } from '@smart/smart-ngrx/types/smart-ngrx-row-base.interface';

export interface CommonSourceNode extends SmartNgRXRowBase {
  id: string;
  type?: string;
  name: string;
  children: CommonSourceNode[] | string[];
}
