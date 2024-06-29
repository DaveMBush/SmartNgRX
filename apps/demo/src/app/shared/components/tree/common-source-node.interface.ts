import { RowProxyDelete } from '@smart/smart-ngrx/row-proxy/row-proxy-delete.interface';
import { SmartArray } from '@smart/smart-ngrx/selector/smart-array.interface';
import { SmartNgRXRowBase } from '@smart/smart-ngrx/types/smart-ngrx-row-base.interface';
export interface CommonSourceNode extends SmartNgRXRowBase, RowProxyDelete {
  id: string;
  type?: string;
  name: string;
  children: (CommonSourceNode | string)[] & SmartArray;
}
