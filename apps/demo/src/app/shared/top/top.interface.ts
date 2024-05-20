import { SmartNgRXRowBase } from '@smart/smart-ngrx/types/smart-ngrx-row-base.interface';

import { Location } from '../locations/location.interface';

export interface Top extends SmartNgRXRowBase {
  id: string;
  locations: Location[] | string[];
}
