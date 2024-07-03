import {
  RowProxyDelete,
  SmartArray,
  SmartNgRXRowBase,
} from '@smart/smart-ngrx';
export interface CommonSourceNode extends SmartNgRXRowBase, RowProxyDelete {
  id: string;
  type?: string;
  name: string;
  children: (CommonSourceNode | string)[] & SmartArray;
}
